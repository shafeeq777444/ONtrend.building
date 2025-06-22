import { createSlice } from "@reduxjs/toolkit";
// const defaultCenter = {
//             lat: 23.588,
//             lng: 58.3829}

const userSlice = createSlice({
    name: "user",
    initialState: {
        location: { lat: "", lng: "" },
        locationName: "",
        wishlistIds: new Set(),
        userId: "user12",
        language:"english"
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setLocationName: (state, action) => {
            state.locationName = action.payload;
        },
        setWhishListIds: (state, action) => {
            state.wishlistIds = action.payload;
        },
    },
});

export const { setLocation, setLocationName, setWhishListIds } = userSlice.actions;
export default userSlice.reducer;
