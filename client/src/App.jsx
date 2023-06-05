import React from 'react'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Register from './pages/Register'
import ProductList from './pages/ProductList'
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Success from './pages/Success'
import { useSelector } from 'react-redux'
import Logout from './pages/Logout'




const App = () => {
  const user = useSelector(state=>state.user.currentUser)
  return (
      <Router>
        <Routes>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />}/> 
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<ProductList />}/>
          <Route path="/products/:category" element={<ProductList />}/>
          <Route path="/product/:id" element={<Product />}/>
          <Route path="/register" element={user ? <Navigate to="/"/> : <Register />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/register" element={<Register />} /> 
          <Route path="/logout" element={<Logout />} />
          <Route path="/success" element={<Success />}/>

        </Routes>
      </Router>
  )
}

export default App
