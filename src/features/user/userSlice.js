
import { createSlice } from "@reduxjs/toolkit";
// import { auth } from "@/firebaseDemo/democonfig";

const userSlice = createSlice({
    name: "user",
    initialState: {
        location: { lat: "17.0195", lng: "54.0894" },
        locationName: "Salalah",
        wishlistIds: new Set(),
        userId: null,
        language: "english",
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
          setUserID: (state, action) => {
            state.userId = action.payload;
        },
        setLocationName: (state, action) => {
            state.locationName = action.payload;
        },
        setWhishListIds: (state, action) => {
            state.wishlistIds = action.payload;
        },
    },
});

export const { setLocation, setLocationName, setWhishListIds,setUserID } = userSlice.actions;
export default userSlice.reducer;
