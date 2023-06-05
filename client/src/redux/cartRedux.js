// import {createSlice} from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name:"cart",
//     initialState:{
//         products:[],
//         quantity:0,
//         total:0,

//     },
//     reducers:{
//         addProduct:(state,action)=>{
//             state.quantity += 1;
//             state.products.push(action.payload);
//             state.total += action.payload.price * action.payload.quantity;
//         },
//     },
// }) 

// export const { addProduct } = cartSlice.actions
// export default cartSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        const deletedProduct = state.products[productIndex];
        state.quantity -= 1;
        state.total -= deletedProduct.price * deletedProduct.quantity ;
        state.products.splice(productIndex, 1);
      }
    },
  increaseQuantity: (state, action) => {
    const productId = action.payload;
    const product = state.products.find((product) => product._id === productId);

    if (product) {
      product.quantity += 1;
      state.total += product.price;
    }
  },
  decreaseQuantity: (state, action) => {
    const productId = action.payload;
    const product = state.products.find((product) => product._id === productId);

    if (product && product.quantity > 1) {
      product.quantity -= 1;
      state.total -= product.price;
    }
  },
}},
);

export const { addProduct, deleteProduct, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;




