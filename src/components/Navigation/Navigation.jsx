import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <Flex p={4} bg="blue.500" color="white">
      <Box>
        <Link
          as={RouterLink}
          to={isAuthenticated ? '/contacts' : '/login'}
          mr={4}
        >
          Contacts
        </Link>
        {isAuthenticated ? null : (
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
        {isAuthenticated && <UserMenu />}
      </Box>
    </Flex>
  );
};

export default Navigation;