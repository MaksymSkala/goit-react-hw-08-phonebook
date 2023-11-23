import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './contactsSlice';
import authReducer from './path-to-authSlice/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: rootReducer, // Замість "reducer: rootReducer,"
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;