import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        users: [],
        currentUser: null,
        isFetching: false,
        error:false,
    },
    reducers:{
        loginStart:(state) => {
            state.isFetching=true;
        },
        loginSuccess:(state,action) => {
            state.isFetching= false;
            state.currentUser= action.payload;
        },
        loginFailure:(state) => {
            state.isFetching= false;
            state.error = true;
        },

        //Get all
        getUserStart:(state)=>{
            state.isFetching = true
            state.error = false
        },
        getUserSuccess:(state,action)=>{
            state.isFetching = false
            state.products = action.payload
        },
        getUserFailure:(state,action)=>{
            state.isFetching = false;
            state.error = true;
        },

        //Delete
        deleteUserStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess:(state,action)=>{
            state.isFetching = false;
            state.users.splice(
            state.users.findIndex((item) => item._id === action.payload),
        1
            );
        },
        deleteUserFailure:(state,action)=>{
            state.isFetching = false;
            state.error = true;
        },
        
        //Add
        addUserStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        addUserSuccess:(state,action)=>{
            state.isFetching = false;
            state.users.push(action.payload);
        },
        addUserFailure:(state,action)=>{
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        }, 
    },
    },
) 

export const { loginStart,loginSuccess,loginFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess,getUserStart,getUserSuccess,getUserFailure,addUserStart,addUserSuccess,addUserFailure,logout } = userSlice.actions
export default userSlice.reducer
