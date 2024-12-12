import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user:{} },
    reducers: {
        loginRequest(state,action){
            state.userLoading = true;
            state.isAuthenticated = false;
        },
        loginSuccess(state,action){
            state.userLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
            state.userMessage = action.payload.message;
        },
        loginFail(state,action){
            state.userLoading = false;
            state.isAuthenticated = false;
            state.userError = action.payload;
        },

        signupRequest(state,action){
            state.userLoading = true;
        },
        signupSuccess(state,action){
            state.userLoading = false;
            state.userMessage = action.payload.message;
        },
        signupFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        loadUserRequest(state,action){
            state.userLoading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess(state,action){
            state.userLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail(state,action){
            state.userLoading = false;
            state.isAuthenticated = false;
            state.user = {}
            state.userError = action.payload;
        },

        logoutRequest(state,action){
            state.userLoading = true;
        },
        logoutSuccess(state,action){
            state.userLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.userMessage = action.payload;
        },
        logoutFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        allUsersRequest(state,action){
            state.userLoading = true;
            state.users = [];
        },
        allUsersSuccess(state,action){
            state.userLoading = false;
            state.users = action.payload.data.users;
            state.resultPerPage = action.payload.data.resultPerPage;
            state.userFilteredCount =  action.payload.data.userFilteredCount;
        },
        allUsersFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        clearError(state,action){
            state.userError = null;
        },
        clearMessage(state,action){
            state.userMessage = null;
        }
    }
})

export default userSlice.reducer;

export const { 
    loginRequest,
    loginSuccess, 
    loginFail,
    signupRequest,
    signupSuccess,
    signupFail, 
    loadUserRequest, 
    loadUserSuccess, 
    loadUserFail, 
    logoutRequest, 
    logoutSuccess, 
    logoutFail,
    allUsersFail,
    allUsersSuccess,
    allUsersRequest,
    clearError, 
    clearMessage 
} = userSlice.actions;
