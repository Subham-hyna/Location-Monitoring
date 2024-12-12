import axios from "axios";
import { server } from "../store";
import { allUsersFail, allUsersRequest, allUsersSuccess, clearError, clearMessage, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutRequest, logoutSuccess, signupFail, signupRequest, signupSuccess } from "../reducers/userReducer";
//Login owner
export const login = (username,password) => async (dispatch) => {
    try {
      dispatch(loginRequest());
  
      const config = { 
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };
  
      const { data } = await axios.post(`${server}/users/login`,
      { username, password },
      config
      );
  
      dispatch(loginSuccess(data));
      localStorage.setItem("Access-Token",data.data.accessToken);
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
};

export const signup = (userData) => async (dispatch) => {
  try{
    dispatch(signupRequest());

    const config = { 
      headers: { "Content-Type": "application/json" },
      withCredentials: true
  };

  const { data } = await axios.post(`${server}/users/register`,
  userData,
  config
  );

  dispatch(signupSuccess(data));
} catch (error) {
  dispatch(signupFail(error.response.data.message));
}
}

//LoadUser
export const loadUser = () => async (dispatch) => {
    try {
      dispatch(loadUserRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        withCredentials: true
    }
  
      const { data } = await axios.get(`${server}/users/current-user`,
      config
      );
  
      dispatch(loadUserSuccess(data.data.user));
    } catch (error) {
      console.log(error)
      dispatch(loadUserFail(error.response.data.message));
    }
  };

  // Logout User
export const logout = () => async (dispatch) => {
  try {

    dispatch(logoutRequest());

    let token = localStorage.getItem("Access-Token");

    const config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
  }
      
    const { data } = await axios.get(`${server}/users/logout`,
    config
    );

    dispatch(logoutSuccess(data.message));
    localStorage.setItem("Access-Token","");

  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

// Get All Users
export const getUsers = (q = "", currentPage = 1) => async (dispatch) => {
  try {
    dispatch(allUsersRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
    }

    let link = `${server}/users/get-users?q=${q}&page=${currentPage}`;

    const { data } = await axios.get(link,config);

    dispatch(allUsersSuccess(data));
  } catch (error) {
    dispatch(allUsersFail(error.response.data.message));
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