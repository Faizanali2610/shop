 const express = require("express");
 const app = express();
 const mongoose = require("mongoose")
 const dotenv = require("dotenv")
 const userRoute = require("./routes/user")
 const authRoute = require("./routes/auth")
 const productRoute = require("./routes/product")
 const cartRoute = require("./routes/cart")
 const orderRoute = require("./routes/order")
 const stripeRoute = require("./routes/stripe")
 const cors = require("cors");
const bodyParser = require("body-parser");

 dotenv.config();

 mongoose.set('strictQuery',false);
 mongoose.set('strictQuery',true);

 mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
 console.log(`mongodb is connected with server`);
 })

 app.use(bodyParser.urlencoded({extended:false}))
 app.use(cors())
 app.use(express.json())
 app.use("/api/auth",authRoute);
 app.use("/api/users",userRoute);
 app.use("/api/products",productRoute)
 app.use("/api/carts",cartRoute);
 app.use("/api/orders",orderRoute);
 app.use("/api/checkout",stripeRoute);

 const PORT = 4000;

 app.listen(process.env.PORT || PORT,()=>{
    console.log(`backend server is running ${PORT} `)
 });
