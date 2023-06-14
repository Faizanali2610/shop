import "./userList.css";
import logo from "../../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { userRequest } from "../../requestmethod";
import { deleteUsers } from "../../redux/apicalls";
import { useDispatch } from "react-redux";

export default function UserList() {
  const [users,setUsers] = useState([]);
  const dispatch = useDispatch()

  useEffect(()=>{
    const getUsers = async () => {
      try {
      const res = await userRequest.get("users")
      setUsers(res.data)
      } catch (error) { 
        console.log(error)
      }
    };
    getUsers();

  },[])


  const handleDelete = async (id) => {
    try {
      await deleteUsers(id, dispatch);
      
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
   
 
  
  
  const columns = [
    { field: "_id", headerName: "ID", width: 320},
   
    {
      field: "user",
      headerName: "User",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={logo} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 310 },
    { field: "isAdmin" ,headerName:"Admin", width:150},
  
    {
      field: "action",
      headerName: "Action",
      width: 360,
      
      renderCell: (params) => {
        return (
          <>
            <DeleteOutlineOutlined
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
 

  return (
    <>
    <Link to="/newUser">
    <button className="CreateuserButton">Create-User</button>
     </Link>
  
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
 </> 
 );
}