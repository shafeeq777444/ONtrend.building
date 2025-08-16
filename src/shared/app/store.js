import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/userSlice';
import foodReducer from '../slices/food/foodSlice';
import buildingReducer from '../../modules/building/slices/buildingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    building:buildingReducer
  },
});
