import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../authSlice/authSlice';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Виклик функції для реєстрації
    const success = await dispatch(register({ name, email, password }));

    // Якщо реєстрація успішна, перенаправити на сторінку логіну
    if (success) {
      navigate('/login');
    }
  };

  return (
    <VStack spacing={4} align="center">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input type="text" name="name" value={name} onChange={handleNameChange} />
        </FormControl>
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
      <Link to="/login">Already have an account? Login here</Link>
    </VStack>
  );
};

export default Register;