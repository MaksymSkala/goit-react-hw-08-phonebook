import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact, addContact } from '../../reducers/contactsSlice';
import { Button, Input, ListItem, UnorderedList, VStack, Box } from '@chakra-ui/react';
import UserMenu from '../UserMenu/UserMenu';
import Filter from '../Filter/Filter';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);

  // Використовуйте фільтровані контакти
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const [newContact, setNewContact] = useState({ name: '', number: '' });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const isContactUnique = () => {
    return !filteredContacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase() || contact.number === newContact.number
    );
  };

  const handleAddContact = () => {
    if (!isContactUnique()) {
      alert('Contact with this name or number already exists.');
      return;
    }

    dispatch(addContact(newContact));
    setNewContact({ name: '', number: '' });
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <VStack spacing={4} align="stretch">
      {/* Додайте кнопку Logout вверху справа */}
      <Box alignSelf="flex-end" mt={2}>
        <UserMenu />
      </Box>
      
      {/* Додаємо компонент Filter */}
      <Filter />

      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={newContact.name}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="number"
        placeholder="Phone Number"
        value={newContact.number}
        onChange={handleInputChange}
      />
      <Button colorScheme="teal" onClick={handleAddContact}>
        Add Contact
      </Button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
    </VStack>
  );
};

export default Contacts;