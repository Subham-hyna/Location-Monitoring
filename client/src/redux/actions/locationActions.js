import axios from "axios";
import { server } from "../store";
import { allLocationsFail, allLocationsRequest, allLocationsSuccess, clearError, clearMessage } from "../reducers/locationReducer";

// Get All Users
export const getLocationHistory = (userId) => async (dispatch) => {
  try {
    dispatch(allLocationsRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
    }

    let link = `${server}/location/get-location/${userId}`;

    const { data } = await axios.get(link,config);

    dispatch(allLocationsSuccess(data));
  } catch (error) {
    dispatch(allLocationsFail(error.response.data.message));
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearError());
  };
  
  //Clearing Message
  export const clearMessages = () => async (dispatch) => {
    dispatch(clearMessage());
  };