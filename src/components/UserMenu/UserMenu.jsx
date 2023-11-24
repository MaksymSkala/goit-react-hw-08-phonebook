import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../authSlice/authSlice';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Виклик функції для виходу
    await dispatch(logoutUser());

    // Видалення токену з localStorage та перенаправлення на головну сторінку
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box>
      <Text fontSize="sm" mr={2}>
        {email}
      </Text>
      <Button size="sm" colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;