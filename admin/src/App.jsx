import React from 'react'
import {BrowserRouter as Router,Routes,Route, Navigate,} from "react-router-dom"
import Topbar from './components/Topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import UserList from './pages/userList/UserList'
import "./app.css"
import Home from './pages/home/Home'
import NewUser from './pages/newUser/NewUser'
import ProductList from './pages/ProductList/ProductList'
import Product from './pages/product/Product'
import NewProduct from './pages/newProduct/NewProduct'
import Login from './pages/login/Login'
import { useSelector } from 'react-redux'

const App = () => {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);
  return (
   <Router>
      
      {location.pathname !== '/login' && <Topbar />}
      <div className="container">
        {location.pathname !== '/login' && <Sidebar />}
       
        <Routes>
   <Route path="/login" element={admin ? <Navigate to="/"/> : <Login />} />
  {admin && (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/newUser" element={<NewUser />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/newproduct" element={<NewProduct />} />
 </> 
  )}
</Routes>


  
     </div>
    
     
    
    
    </Router>
  
  )
}

export default App


