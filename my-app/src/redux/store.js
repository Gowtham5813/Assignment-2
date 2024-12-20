import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Example slice for users
import itemReducer from './slices/itemSlice'; // Example slice for items

const store = configureStore({
  reducer: {
    users: userReducer,
    items: itemReducer,
  },
});

export default store;
