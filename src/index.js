import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './components/App';

const Root = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
};

export default Root;