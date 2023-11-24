import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'; // Додайте імпорт Provider
import rootReducer from './contactsSlice';
import authReducer from '../authSlice/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Тепер експортуйте Provider, щоб його можна було використовувати в інших файлах
export default store;
export { Provider }; // Додайте цей рядок