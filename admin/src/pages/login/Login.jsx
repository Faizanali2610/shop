import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { login } from '../../redux/apicalls'
import { useNavigate } from 'react-router-dom'
import "./login.css"

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault()
        login(dispatch,{username,password})
        navigate("/")
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
      <button className="button" onClick={handleClick}>
        Login
      </button>
    </div>
  </div>
);
};

  

export default Login
