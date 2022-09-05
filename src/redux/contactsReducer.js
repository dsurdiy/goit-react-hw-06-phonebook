import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { add, remove, changeFilter } from './contactsActions';

const contactsReducer = createReducer(
  { items: [], filter: '' },
  {
    [add]: (state, action) => ({
      items: [...state.items, action.payload],
      filter: '',
    }),
    [remove]: (state, action) => ({
      items: state.items.filter(item => item.id !== action.payload),
      filter: '',
    }),
    [changeFilter]: (state, action) => ({
      items: [...state.items],
      filter: action.payload,
    }),
  }
);

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducer
);
