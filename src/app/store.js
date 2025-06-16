import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import foodReducer from '../features/food/foodSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
  },
});
