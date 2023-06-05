import { useState } from "react";
import "./newUser.css";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux/apicalls";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch()
  const navigate  = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const user = {
      name,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      isAdmin,
    };

    addUsers(dispatch,user);

    setName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsAdmin(false);

    navigate("/users")
  };
  
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Name</label>
          <input  type="text" placeholder="john" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input  type="text" placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input  type="text" placeholder="john" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
     
        <div className="newUserItem">
          <label>Email</label>
          <input  type="email" placeholder="john@gmail.com" value={email}  onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input  type="password" placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Confirm Password</label>
          <input type="password"  placeholder="password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>admin</label>
          <select className="newUserSelect" name="isAdmin" id="isAdmin" value={isAdmin ? "true" : "false"}
            onChange={(e) => setIsAdmin(e.target.value === "true")} >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
  }

 