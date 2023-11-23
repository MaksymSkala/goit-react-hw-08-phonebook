import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../authSlice/authSlice';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Виклик функції для реєстрації
    dispatch(register({ email, password }));
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
        <Button type="submit" colorScheme="green">
          Register
        </Button>
      </form>
    </VStack>
  );
};

export default Register;