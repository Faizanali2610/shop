
import { columnGroupsStateInitializer } from "@mui/x-data-grid/internals";
import { publicRequest, userRequest } from "../requestmethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productReducer";
import { loginFailure, loginStart, loginSuccess,getUserStart,getUserSuccess,getUserFailure, addUserStart, addUserSuccess, addUserFailure,logout } from "./userRedux";




export const login = async (dispatch, user) => {

    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user)
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
      console.log(error)
    }
  };


export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure());
    }
}


export const deleteProducts = async (id, dispatch) => {

    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(res.data));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}


export const addProducts = async (product, dispatch) => {

    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure());
    }
}


export const updateProduct = async (id, updatedData,dispatch) => {

  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, updatedData);
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
}



// USERS
export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await publicRequest.get("/users")
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailure());
    }
}


export const addUsers = async (dispatch,user) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post(`/users`, user)
        dispatch(addUserSuccess(res.data));
    } catch (error) {
        dispatch(addUserFailure());
    }
}


export const deleteUsers = async (id, dispatch) => {

    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/users/${id}`)
        dispatch(deleteProductSuccess(res.data));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}






