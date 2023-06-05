import axios from "axios";
import { loginFailure, loginStart, loginSuccess,logout,registerStart,registerSuccess,registerFailure } from "./userRedux"
import { publicRequest } from "../requestMethods";

export const login = async (dispatch,user) => {
        dispatch(loginStart());
        try {
            const res = await publicRequest.post("/auth/login", user)
            dispatch(loginSuccess(res.data));
        } catch (error) {
         dispatch(loginFailure())   
        }
}

export const logoutUser = async (dispatch) => {
    try {
      await publicRequest.post("/auth/logout");
  
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  export const registerUser = async (dispatch, user) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post("/auth/register", user);
      dispatch(registerSuccess(res.data));
    } catch (error) {
      dispatch(registerFailure());
    }
  };
  