// const CryptoJS = require("crypto-js");
const express = require("express");
const app = express();
const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
// app.use(express.json());


// Register
router.post("/register",async(req,res)=>{
  try {
    const {username,email,password } = req.body;
    const user = new User({
      username,
      email,
      password:CryptoJS.AES.encrypt(password,process.env.PASS_SEC).toString()
    });
    const saveUser = await user.save();
    res.status(201).json(
      saveUser
    )
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'internal error'})
  }
})

// login

router.post("/login",async(req,res)=>{
  try {
    const user = await User.findOne({username:req.body.username})
    if(!user){ return res.status(401).json("wrong credentails")}

    const hashPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC)
    const originalpassword = hashPassword.toString(CryptoJS.enc.Utf8)
    if(originalpassword !== req.body.password){
     return res.status(401).json("Wrong credentails")};
  
    const accessToken = jwt.sign({
      id:user._id,
      isAdmin:user.isAdmin
    },
    process.env.JWT_SEC,
    {expiresIn:"3d"}
    );


    const {password, ...others} = user._doc;

    res.status(200).json({...others,accessToken});
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/logout", async (req, res) => {
  try {

    // localStorage.removeItem("accessToken");
    res.clearCookie("accessToken");

    
    res.status(200).json("Logout successful");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
});


module.exports = router
