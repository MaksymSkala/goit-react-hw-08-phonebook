import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get('https://655cbaa725b76d9884fddb88.mockapi.io/contacts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
  try {
    const response = await axios.post('https://655cbaa725b76d9884fddb88.mockapi.io/contacts', newContact);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add contact');
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    await axios.delete(`https://655cbaa725b76d9884fddb88.mockapi.io/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    throw new Error('Failed to delete contact');
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], filter: '', isLoading: false, error: null },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;