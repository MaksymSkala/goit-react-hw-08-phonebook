import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Button, Spacer } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu'; // Імпорт компоненту UserMenu

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null); // Перевірка, чи користувач увійшов у систему

  return (
    <Flex p={4} bg="blue.500" color="white">
      <Box>
        <Link as={RouterLink} to="/" mr={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/contacts" mr={4}>
          Contacts
        </Link>
        {isAuthenticated ? null : ( // Відображення тільки для неавторизованих користувачів
          <>
            <Link as={RouterLink} to="/register" mr={4}>
              Register
            </Link>
            <Link as={RouterLink} to="/login" mr={4}>
              Login
            </Link>
          </>
        )}
      </Box>
      <Spacer />
      <Box>
        {isAuthenticated && <UserMenu />} {/* Відображення UserMenu тільки для авторизованих користувачів */}
      </Box>
    </Flex>
  );
};

export default Navigation;