import "./widgetsm.css";
// import { Visibility } from "@material-ui/icons";
import { Handshake, VisibilityOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestmethod";
import profileicon from "../../assets/logo.jpeg"
import { useNavigate } from "react-router-dom";

export default function Widgetsm() {
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getUsers = async () => {
      try {
      const res = await userRequest.get("users/?new=true")
      setUsers(res.data)
      } catch (error) { 
        console.log(error)
      }
    };
    getUsers();
  },[])

  const handleclick = () => {
    navigate("users")
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user)=>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={profileicon}
            alt="img"
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton" onClick={handleclick}>
            <VisibilityOutlined className="widgetSmIcon" />
            Display
          </button>
        </li>  
        ))}
      </ul>
    </div>
  );
}