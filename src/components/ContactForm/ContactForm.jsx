import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../reducers/contactsSlice';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !number) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('https://connections-api.herokuapp.com/contacts', { name, number });
      dispatch(addContact(response.data)); // Оновлення стану Redux
      setName('');
      setNumber('');
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} align="flex-start">
      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input type="text" name="name" value={name} onChange={handleNameChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Number:</FormLabel>
        <Input type="tel" name="number" value={number} onChange={handleNumberChange} />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Add contact
      </Button>
    </VStack>
  );
};

export default ContactForm;