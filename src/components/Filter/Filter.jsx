import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../reducers/contactsSlice';
import { Input, Button, HStack, VStack } from '@chakra-ui/react';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleClearFilter = () => {
    dispatch(setFilter(''));
  };

  return (
    <VStack spacing={4} align="flex-start">
      <HStack>
        {/* Оновлений Input для відображення поточного фільтра зі стану Redux */}
        <Input
          type="text"
          name="filter"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Find contacts by name"
        />
        <Button onClick={handleClearFilter} colorScheme="gray" variant="outline">
          Clear Filter
        </Button>
      </HStack>
    </VStack>
  );
};

export default Filter;