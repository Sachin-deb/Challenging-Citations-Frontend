// src/ProfessorCard.js
import { Box, Image, Text, Stack, Heading } from '@chakra-ui/react';

function ProfessorCard({ professor }) {
  return (
    <Box
      maxW="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      textAlign="center"
      background="white"
      _hover={{ boxShadow: '2xl', transform: 'scale(1.05)' }}
    >
      <Image
        borderRadius="full"
        boxSize="100px"
        src={professor.image_url !== "Image Not Available" ? professor.image_url : "default-image.jpg"}
        alt={professor.name}
        mx="auto"
        my={2}
      />
      <Stack spacing={2}>
        <Heading fontSize="xl">{professor.name}</Heading>
        <Text color="gray.600"><strong>Citations:</strong> {professor.citation_count}</Text>
        <Text color="gray.600"><strong>Publications:</strong> {professor.publication_count}</Text>
      </Stack>
    </Box>
  );
}

export default ProfessorCard;
