import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    Allitems: [], 
    Item: {
      id:'',
      name: '',
      description: '',
      price: '',
    },
    errors: {},
  },
  reducers: {
    setItem: (state, action) => {
      const {id, name, description, price } = action.payload;
      state.Item = {id, name, description, price };
    },
    addItem: (state, action) => {
      state.Allitems.unshift(action.payload); 
    }
  },
});

export const { setItem,addItem } = itemSlice.actions;
export default itemSlice.reducer;
