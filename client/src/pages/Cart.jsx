import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import styled from 'styled-components'
import {  Add,  Remove } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete';
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import StripeCheckout from "react-stripe-checkout"; 
import axios from 'axios'
import { userRequest } from '../requestMethods' 
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../redux/cartRedux'


const KEY = import.meta.env.VITE_REACT_APP_STRIPE;

const Container = styled.div`

`;

const Wrapper = styled.div`
padding: 20px;
${mobile({padding:"10px"})}
`;


const Title = styled.h1`
font-weight: 300;
text-align: center;
`

const Top = styled.div`
display: flex;
align-itmes: center;
justify-content: space-between;
padding: 10px;
`

const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${props=>props.type === "filled" && "none"};
background-color: ${props=>props.type === "filled" ? "black"  : "transparent"};
color: ${props=>props.type === "filled" && "white"};
`
const TopTexts = styled.div`
${mobile({display: "none"})}
`

const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px;
`
const Bottom = styled.div`
display: flex;
justify-content: space-between;
${mobile({flexDirection: "column"})}
`

const Info = styled.div`
position:relative;
flex: 3;`

const Product = styled.div`
display: flex;
justify-content: space-between;
align-items:right;
${mobile({flexDirection: "column"})}
`

const ProductDetail = styled.div`
flex: 2;
display: flex;
`

const Image = styled.img`
height: 230px;
width: 230px;
`

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`

const ProductName = styled.span`
margin: 8px;
`

const ProductId = styled.span`
margin: 8px;

`

const ProductColor = styled.div`
margin: 8px;
width: 23px;
height: 23px;
border-radius: 50%;
background-color: ${props=>props.color}
`

const ProductSize = styled.span`
margin: 5px;
`

const PriceDetail = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;`

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`

const ProductAmount = styled.div`
width: 30px;
height: 30px;
border-radius: 10px;
border: 2px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
font-size: 15px;
margin: 5px;
${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
background-color:red;
border: none;
height: 1px;
`

const Summary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 50vh;
`;

const SummaryTitle = styled.h1`
font-weight: 200;
`

const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props=>props.type === "total" && "600"};
font-size: ${props=>props.type === "total" && "27px"};
`

const Delete = styled.div`
cursor: pointer;
  position: absolute;
  top: 30px;
  right: 152px;
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
cursor: pointer;

&:hover{
  background-color: teal;
}
`

const Cart = () => {
  const cart = useSelector((state)=>state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const [quantity,setQuantity] = useState(1)

  const navigate = useNavigate()
  const dispatch = useDispatch();



  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleQuantityIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };
  
  const handleQuantityDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));

  };

   useEffect(()=>{
    const makeRequest = async() => {
    try {
      const res = await userRequest.post("/checkout/payment",{
        tokenId: stripeToken.id,
        amount:cart.total *  100,
      }) 
      navigate("/success",{
        state:{
        stripeData:res.data,
        cart: cart,
    }});
    } catch (error) {
      console.log(error)
    }
  } 
    stripeToken && makeRequest();
   },[stripeToken,cart.total,navigate])

  return (
   <Container>
    <Announcement />
    <Navbar />
    <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
         <TopButton>CONTINUE SHOPPING</TopButton>
           <TopTexts>
            <TopText>
                Shopping Bag(2)
            </TopText>
            <TopText>
             Your Wishlist (0)
            </TopText>
            </TopTexts>
         <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
            <Info>

              {cart.products.map(product=>(
              <Product>
                  <ProductDetail>
                <Image src={product.img}/>
                <Details>
                  <ProductName><b>Product:</b> {product.title}</ProductName>
                  <ProductId><b>ID:</b> {product._id}</ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize><b>Size:</b> {product.size}</ProductSize>
                </Details>
                </ProductDetail>
                  
            <DeleteIcon style={{position:"relative",top:"8px",left:"245px",cursor:"pointer",color:"solid teal"}} onClick={()=>handleDelete(product.id)} />

                 <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => handleQuantityIncrease(product._id)}/>
                   <ProductAmount >{product.quantity}</ProductAmount>
                    <Remove onClick={() => handleQuantityDecrease(product._id)}/>
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                 </PriceDetail>
              </Product>
              ))}
               
            </Info>
             <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem> 
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem> 
              <SummaryItem type="total"> 
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
              name="Lama Shop"
              image="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              billingAddress
              shippingAddress
              description={`Your total is $ ${cart.total}`}
              amount={cart.total*100}
              token={onToken}
              stripeKey={KEY}
              >
              <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
             </Summary>
        </Bottom>
    </Wrapper>
    <Footer />
   </Container>
  )
}

export default Cart

