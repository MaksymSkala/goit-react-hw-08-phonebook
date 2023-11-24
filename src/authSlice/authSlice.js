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
      // Відповідь отримана, але сервер повернув помилку зі статусом
      return error.response.data;
    } else if (error.request) {
      // Запит було відправлено, але відповідь не отримано
      throw new Error('No response received from the server');
    } else {
      // Виникла помилка під час налаштування запиту
      throw new Error('Request configuration error');
    }
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const response = await axios.post('https://connections-api.herokuapp.com/users/login', { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Відповідь отримана, але сервер повернув помилку зі статусом
      return error.response.data;
    } else if (error.request) {
      // Запит було відправлено, але відповідь не отримано
      throw new Error('No response received from the server');
    } else {
      // Виникла помилка під час налаштування запиту
      throw new Error('Request configuration error');
    }
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await axios.post('/api/auth/refreshToken');
  saveTokenToLocalStorage(response.data.token);
  return response.data.user;
});

// Асинхронний thunk для виходу з облікового запису
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('https://connections-api.herokuapp.com/users/logout');
    removeTokenFromLocalStorage(); // Впевніться, що правильно імпортуєте removeTokenFromLocalStorage
    return true; // Якщо успішно вийшли, можна повернути якусь інформацію, якщо потрібно
  } catch (error) {
    throw new Error('Failed to log out'); // Можна відправити якусь іншу помилку, якщо потрібно
  }
});

// ... інші редуктори та extraReducers

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Реєстрація, Логін, Оновлення токену
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
      // ... інші extraReducers
      // Вихід
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