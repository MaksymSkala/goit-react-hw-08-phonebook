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

    // Виклик функції для логіну
    const success = await dispatch(login({ email, password }));

    // Якщо логін успішний, перенаправити на сторінку контактів
    if (success) {
      navigate('/contacts');
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