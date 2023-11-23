import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const UserMenu = ({ email, onLogout }) => {
  return (
    <Box>
      <Text fontSize="sm" mr={2}>
        {email}
      </Text>
      <Button size="sm" colorScheme="red" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;