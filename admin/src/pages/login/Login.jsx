import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { login } from '../../redux/apicalls'
import { useNavigate } from 'react-router-dom'
import "./login.css"

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const handleClick = async (e)=>{
       
        try {
          await login(dispatch,{username,password})
          navigate('/');
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <div className="containers">
    <div className="form">
      <h1 className="logo">Login</h1>
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleClick} >
        LOGIN
      </button>
    </div>
  </div>
);
};

  

export default Login
