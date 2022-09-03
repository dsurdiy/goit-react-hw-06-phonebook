import { configureStore } from '@reduxjs/toolkit';
import { contacts } from './contactsReducer';

export const store = configureStore({
  reducer: {
    contacts,
  },
});
