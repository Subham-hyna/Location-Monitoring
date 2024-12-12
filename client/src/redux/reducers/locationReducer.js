import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",
    initialState: { location:{} },
    reducers: {

        allLocationsRequest(state,action){
            state.locationLoading = true;
            state.locations = [];
        },
        allLocationsSuccess(state,action){
            state.locationLoading = false;
            state.locations = action.payload.data.locations;
        },
        allLocationsFail(state,action){
            state.locationLoading = false;
            state.locationError = action.payload;
        },

        clearError(state,action){
            state.error = null;
        },
        clearMessage(state,action){
            state.message = null;
        }
    }
})

export default locationSlice.reducer;

export const {  
    allLocationsRequest,
    allLocationsSuccess,
    allLocationsFail,
    clearError, 
    clearMessage 
} = locationSlice.actions;
