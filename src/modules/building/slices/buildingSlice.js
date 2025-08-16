
import { createSlice } from "@reduxjs/toolkit";

const buildingSlice = createSlice({
    name: "building",
    initialState: {
       where:"",
       checkIn:null,
       checkOut:null,
       adultCount:1,
       childrenCount:0
    },

    reducers: {
        setWhereSlice:(state,action)=>{
            state.where=action.payload
        },
        setCheckInSlice:(state,action)=>{
            state.checkIn=action.payload
        },
        setCheckOutSlice:(state,action)=>{
            state.checkOut=action.payload
        },
        setAdultCountSlice:(state,action)=>{
            state.adultCount=action.payload
        },
        setChildrenCountSlice:(state,action)=>{
            state.childrenCount=action.payload
        }

    },
});

export const { setAdultCountSlice,setCheckInSlice,setCheckOutSlice,setChildrenCountSlice,setWhereSlice } = buildingSlice.actions;
export default buildingSlice.reducer;
