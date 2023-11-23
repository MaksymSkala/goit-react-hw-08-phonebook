import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../reducers/contactsSlice';
import { Button, ListItem, UnorderedList } from '@chakra-ui/react';
import axios from 'axios';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.items);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const filter = useSelector((state) => state.filter);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Фільтрація контактів з використанням введеного фільтра
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`https://connections-api.herokuapp.com/contacts/${contactId}`);
      dispatch(deleteContact(contactId));
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <UnorderedList>
      {filteredContacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          {name}: {number}
          <Button colorScheme="red" size="xs" onClick={() => handleDeleteContact(id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default ContactList;