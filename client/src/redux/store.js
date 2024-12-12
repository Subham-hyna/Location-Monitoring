import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import locationSlice from './reducers/locationReducer';

const store = configureStore({
    reducer: {
        user : userSlice,
        location : locationSlice,
    },
  });
  
  export default store;
  
  export const server = "http://127.0.0.1:8000/api/v1";
