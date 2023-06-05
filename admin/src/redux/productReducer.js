import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:"product",
    initialState:{
        products: [],
        isFetching: false,
        error:false,
    },
    reducers:{
        //get all
        getProductStart:(state)=>{
            state.isFetching = true
            state.error = false
        },
        getProductSuccess:(state,action)=>{
            state.isFetching = false
            state.products = action.payload
        },
        getProductFailure:(state,action)=>{
            state.isFetching = false;
            state.error = true;
        },
        //delete
        deleteProductStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.products.splice(
            state.products.findIndex((item) => item._id === action.payload),
        1
            );
        },
        deleteProductFailure:(state,action)=>{
            state.isFetching = false;
            state.error = true;
        },
          //UpDATe
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
          },
          updateProductSuccess: (state, action) => {
            state.isFetching = false;
            const updatedProduct = action.payload;
            state.products = state.products.map((product) =>
              product._id === updatedProduct._id ? updatedProduct : product
            );
          },
          updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
          },

          //add
          addProductStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.products[
                state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.products;
        },
        addProductFailure:(state,action)=>{
            state.isFetching = false;
            state.error = true;
        },
        
    },
}) 

export const {addProductFailure,addProductStart,addProductSuccess,updateProductStart,updateProductSuccess,updateProductFailure,getProductStart,getProductSuccess,getProductFailure,deleteProductFailure,deleteProductSuccess,deleteProductStart} = productSlice.actions
export default productSlice.reducer;