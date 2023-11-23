import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../reducers/contactsSlice';
import { Button, List, ListItem, VStack } from '@chakra-ui/react';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.items);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <VStack align="flex-start">
      <List>
        {filteredContacts.map(({ id, name, number }) => (
          <ListItem key={id} mb={4}>
            {name}: {number}
            <Button ml={4} colorScheme="red" size="sm" onClick={() => handleDeleteContact(id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Contacts;