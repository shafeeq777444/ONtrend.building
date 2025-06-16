import { createSlice } from '@reduxjs/toolkit';


const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foodType:"All",
    categoryBar:"Nearby"
  },
  reducers: {
    setFoodType: (state,action) => {
      state.foodType=action.payload
      
    },
    setFoodCategory: (state,action) => {
      state.categoryBar=action.payload
    },
  },
});

export const { setFoodType,setFoodCategory } = foodSlice.actions;
export default foodSlice.reducer;
