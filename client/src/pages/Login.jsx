// import { Link } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/15188442/pexels-photo-15188442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width: 25%; 
padding: 20px;
background-color: white;
${mobile({width: "65%"})}
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 10px 0px;
padding: 8px;
`;


const Button = styled.button`
 width: 40%;
 border: none;
 padding:15px 20px;
 background-color: teal;
 color: white;
 cursor: pointer;
 border-radius: 4px;
 margin-bottom: 10px;
 &:disabled{
   color: green;
   cursor: pointer;
 }
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;`

const Link  =  styled.a`
margin: 8px 0px;
font-size: 12px;
text-decoration: underline;
cursor: pointer;
`;

const Error =  styled.span`
 color:red;
`;

const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching,error} = useSelector((state)=>state.user)

     const handleClick  = (e) => {
      e.preventDefault();
      login(dispatch,{username,password})
     };


  return (
    <Container>
    <Wrapper>
       <Title>
           CREATE AN ACCOUNT
       </Title>
       <Form>
       <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
       <Input placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
       <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
       {error && <Error>Something went wrong...</Error>}
         <Link>FORGET PASSWORD</Link>
         <Link>CREATE A NEW ACCOUNT</Link>
     </Form>
    </Wrapper>
   </Container>
    )
}

export default Login
