// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {/* <ChakraProvider>
      <App />
    </ChakraProvider> */}
    <ChakraProvider value={defaultSystem}><App /></ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
