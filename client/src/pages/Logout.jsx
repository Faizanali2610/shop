import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {
      try {
        await logoutUser(dispatch);
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    };
    handleLogout()
  
}

export default Logout;
