import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Функція для зберігання токену в локальному сховищі
const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

// Функція для видалення токену з локального сховища
const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

// Асинхронний thunk для реєстрації користувача
export const register = createAsyncThunk('auth/register', async ({ email, password }) => {
    const response = await axios.post('https://connections-api.herokuapp.com/register', { email, password });
    saveTokenToLocalStorage(response.data.token);
    return response.data.user;
});

// Асинхронний thunk для логіну користувача
export const login = createAsyncThunk('auth/login', async (userData) => {
    try {
        const response = await axios.post('https://connections-api.herokuapp.com/login', userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to log in');
    }
});

// Асинхронний thunk для оновлення токену
export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await axios.post('/api/auth/refreshToken');
  saveTokenToLocalStorage(response.data.token);
  return response.data.user;
});

// Асинхронний thunk для виходу з облікового запису
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  removeTokenFromLocalStorage();
});

// Slice для auth
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