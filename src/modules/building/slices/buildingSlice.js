
import { createSlice } from "@reduxjs/toolkit";

const buildingSlice = createSlice({
    name: "building",
    initialState: {
       LocationinputValue:"",
       checkIn:null,
       checkOut:null,
       adultCount:null,
       childrenCount:null
    },

    reducers: {
        setLocationinputValue:(state,action)=>{
            state.LocationinputValue=action.payload
        },
        setCheckIn:(state,action)=>{
            state.checkIn=action.payload
        },
        setCheckOut:(state,action)=>{
            state.checkOut=action.payload
        },
        setAdultCount:(state,action)=>{
            state.adultCount=action.payload
        },
        setChildrenCount:(state,action)=>{
            state.childrenCount=action.payload
        }

    },
});

export const { setLocationinputValue,setCheckIn,setCheckOut,setAdultCount,setChildrenCount } = buildingSlice.actions;
export default buildingSlice.reducer;
