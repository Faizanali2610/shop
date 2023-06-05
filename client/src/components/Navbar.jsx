import { BadgeOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";              
import { mobile } from "../responsive";
import logo from "../assets/logo.png"



const Container = styled.div`
  height: 100px;
  ${mobile({ height: "100px",padding:"21px"  })};
   `;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px"})}
`;


const Left = styled.div`

`;

const Image= styled.img`
  height:120px;
  width:270px;
  margin-left:-40px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({flex: 2, justifyContent: "center",})}
`;

const MenuItem = styled(Button)`
&& {
  font-size: 14px;
  margin-left: 11px;
  color: teal;
  background-color: white;
  text-decoration: none;
  outline: none;

  &:hover {
    background-color: #008080;
    color:white;
  }

${mobile({display:"none",})}
};`;

const Navbar = () => {

  const quantity = useSelector(state=>state.cart.quantity)
  
  return (
    <Container>
      <Wrapper>
        <Left>
          <Image src={logo} alt="logo" />
        </Left>
        <Right>
          <Link to="/register"><MenuItem>REGISTER</MenuItem></Link>
          <Link to="/login"><MenuItem>SIGN IN</MenuItem></Link>
         <Link to="/logout"><MenuItem>SIGN OUT</MenuItem></Link>      
        <Link to="/cart">  
            <Badge style={{marginright:"90px"}} badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;