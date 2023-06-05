import React, { useState } from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import { registerUser } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/15188442/pexels-photo-15188442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") ;
// background: lightgreen;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width: 40%; 
padding: 20px;
background-color: white;
${mobile({width: "65%"})}
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 8px;
`;

const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`;

const Button = styled.button`
 width: 40%;
 border: none;
 padding:15px 20px;
 background-color: teal;
 color: white;
 cursor: pointer;
`


const Title = styled.h1`
font-size: 24px;
font-weight: 300;`



const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault(); 

    const user = {
      name,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    };

    registerUser(dispatch,user);

    setName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };
  return (
    <Container>
     <Wrapper>
        <Title>
            CREATE AN ACCOUNT
        </Title>
        <Form onSubmit={handleSubmit}>
        <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        <Agreement> By creating an account , I consent to the proccessing of my personal data in accordance with the <b>PRIVACY POLICY</b> 
        </Agreement>
        <Button>CREATE</Button>
      </Form>
     </Wrapper>
    </Container>
  )
}

export default Register

