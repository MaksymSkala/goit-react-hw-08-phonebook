import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Button, Spacer } from '@chakra-ui/react';

const Navigation = () => {
  return (
    <Flex p={4} bg="blue.500" color="white">
      <Box>
        <Link as={RouterLink} to="/" mr={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/contacts" mr={4}>
          Contacts
        </Link>
        {/* Додай інші посилання на інші сторінки, наприклад, /register та /login */}
        <Link as={RouterLink} to="/register" mr={4}>
          Register
        </Link>
        <Link as={RouterLink} to="/login" mr={4}>
          Login
        </Link>
      </Box>
      <Spacer />
      <Box>
        {/* Додай компонент UserMenu з поштою користувача і кнопкою виходу */}
        {/* Наприклад: <UserMenu email="user@example.com" onLogout={handleLogout} /> */}
        <Button colorScheme="red" mr={4}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Navigation;