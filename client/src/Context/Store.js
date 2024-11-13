import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './ItemSlice.js';

const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});

export default store;