import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveTokenToLocalStorage, removeTokenFromLocalStorage } from './utils';

export const register = createAsyncThunk('auth/register', async ({ name, email, password }) => {
  try {
    const response = await axios.post('https://connections-api.herokuapp.com/users/signup', { name, email, password });
    saveTokenToLocalStorage(response.data.token);
    return response.data.user;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Request configuration error');
    }
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const response = await axios.post('https://connections-api.herokuapp.com/users/login', { email, password });
    saveTokenToLocalStorage(response.data.token);
    return response.data.user;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Request configuration error');
    }
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  try {
    const response = await axios.post('/api/auth/refreshToken');
    saveTokenToLocalStorage(response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await axios.post('https://connections-api.herokuapp.com/users/logout');
    removeTokenFromLocalStorage();
  } catch (error) {
    throw new Error('Failed to log out');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        removeTokenFromLocalStorage();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;