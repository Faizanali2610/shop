import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'
import axios from "axios"
import { useSelector } from 'react-redux'

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`


const Products = ({cat,filters,sort}) => {

  const currentUser = useSelector((state) => state.user.currentUser);
   const [products,setProducts] = useState([]);
   const [filteredProducts,setFilteredProducts] = useState([]);

   useEffect(()=>{
   const getProducts = async () => {
    try {
      const res = await axios.get(
        cat
          ? `https://e-shop-uzvf.onrender.com/api/products?category=${cat}`
          : "https://e-shop-uzvf.onrender.com/api/products"
      );
      setProducts(res.data)
    } catch (error) {
      console.log("err")
    }
   };
   getProducts() 
   },[cat]);

   useEffect(()=>{
      cat && setFilteredProducts(
      products.filter((item) => 
      Object.entries(filters).every(([key,value])=>
      item[key].includes(value)))
        )
   },[products,cat,filters]);

   useEffect(()=>{
    if(sort === "newest"){
      setFilteredProducts((prev)=>
        [...prev].sort((a,b)=> a.createdAt - b.createdAt)
        )
    }else if ((sort === "asc")){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=> a.price - b.price)
      )
    }else{
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=> b.price - a.price)
      )
    }

   },[sort])

   if (!currentUser) {
    return null; 
  }

  return (
    <Container>
    { cat ? filteredProducts.map((item)=>(
    <Product item={item} key={item.id} />
)) : products.slice(0,23).map((item)=>(
    <Product item={item} key={item.id} />
))}
   </Container>
  )
}

export default Products
