import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../authSlice/authSlice';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Виклик функції для логіну
      const response = await dispatch(login({ email, password }));
  
      // Перенаправити на сторінку контактів, якщо логін успішний
      if (response) {
        navigate('/contacts');
      } else {
        // Видача помилки, якщо логін не вдається
        console.error('Login failed. Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input type="email" name="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input type="password" name="password" value={password} onChange={handlePasswordChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Log In
        </Button>
      </form>
      <Link to="/register">Don't have an account? Register here</Link>
    </VStack>
  );
};

export default Login;