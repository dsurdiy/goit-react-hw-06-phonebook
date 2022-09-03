import { createReducer } from '@reduxjs/toolkit';
import { add, remove, changeFilter } from './contactsActions';

export const contacts = createReducer(
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
