import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfessorCard from './ProfessorCard';
import { Box, Heading, SimpleGrid, Container, Input, HStack, Spinner, Text, Button } from '@chakra-ui/react';
import { debounce } from 'lodash'; // Import lodash for debounce

function App() {
  const [professors, setProfessors] = useState([]); // All professors
  const [filteredProfessor, setFilteredProfessor] = useState(null); // To hold the single filtered professor
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // Loading state for search
  const [error, setError] = useState("");

  // Fetch all professors initially
  useEffect(() => {
    const fetchAllProfessors = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:8000/professors-data");
        setProfessors(response.data);
      } catch (err) {
        setError("Error fetching professors");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfessors();
  }, []);

  // Debounced search handler
  const debouncedSearch = debounce(async (professorName) => {
    if (professorName) {
      setSearchLoading(true); // Start loading when searching
      setError(""); // Clear previous error
      try {
        const response = await axios.get(`http://localhost:8000/professor-data/${encodeURIComponent(professorName)}`);
        setFilteredProfessor(response.data); // Set the single professor data
      } catch (err) {
        setError("Professor not found");
        setFilteredProfessor(null); // Clear the professor if not found
      } finally {
        setSearchLoading(false); // Stop loading after search
      }
    } else {
      setFilteredProfessor(null); // Reset if search term is empty
    }
  }, 300); // Adjust debounce delay as needed

  const handleSearch = () => {
    // Trigger the debounced search
    debouncedSearch(searchTerm);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Highly Cited Professors
      </Heading>

      <HStack mb={6} justifyContent="center">
        <Input
          placeholder="Search for a professor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          width={{ base: "100%", md: "400px" }}
          borderColor="teal.400"
          focusBorderColor="teal.500"
        />
        <Button colorScheme="teal" onClick={handleSearch}>Search</Button> {/* Search Button */}
      </HStack>

      {loading ? (
        <Box textAlign="center" my={4}>
          <Spinner size="xl" />
        </Box>
      ) : searchLoading ? ( 
        <Box textAlign="center" my={4}>
          <Spinner size="xl" />
        </Box>
      ) : error ? (
        <Text color="red.500" textAlign="center">{error}</Text>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredProfessor ? ( 
            <ProfessorCard key={filteredProfessor.name} professor={filteredProfessor} />
          ) : (
            professors.map((professor) => ( 
              <ProfessorCard key={professor.name} professor={professor} />
            ))
          )}
        </SimpleGrid>
      )}
    </Container>
  );
}

export default App;
