import "./widgetsm.css";
// import { Visibility } from "@material-ui/icons";
import { VisibilityOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestmethod";
import logo from "../../assets/logo.jpeg"

export default function Widgetsm() {
  const [users,setUsers] = useState([]);

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

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user)=>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={logo}
            alt="img"
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityOutlined className="widgetSmIcon" />
            Display
          </button>
        </li>  
        ))}
      </ul>
    </div>
  );
}