import React from "react";
import "./topbar.css";
import { ImageOutlined, Language, NotificationsNoneOutlined, Settings } from "@mui/icons-material";
import {Link, useLocation} from "react-router-dom" 

export default function Topbar() {
  const location = useLocation();

  if (location.pathname === '/login') {
    return null; 
  }
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">

        <div className="topLeft">
   
          <span className="logo" style={{color:"rgb(19, 19, 207)",marginLeft:"-10px"}}>FashionCart-Admin</span>
        </div>
        <div className="topRight">
       <Link to="/login"  className="Button">LOGIN</Link> 
       <Link to="/logout" className="Button">LOG-OUT</Link>      


          <div className="topbarIconContainer">
            <NotificationsNoneOutlined />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}