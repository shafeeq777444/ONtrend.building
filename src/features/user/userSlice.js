import { createSlice } from '@reduxjs/toolkit';
// const defaultCenter = {
//             lat: 23.588,
//             lng: 58.3829}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    location:{lat:"",lng:""},
    locationName:""

  },
  reducers: {
    setLocation: (state,action) => {
      state.location=action.payload
      
    },
    setLocationName: (state,action) => {
      state.locationName=action.payload
    },
  },
});

export const { setLocation,setLocationName } = userSlice.actions;
export default userSlice.reducer;
