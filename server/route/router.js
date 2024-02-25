// Filename: routes/index.js
// Import user schema from model/userschema.js
const userschema = require("../model/userschema.js");
const hashPassword = require("../utils/hashpassword.js");
const checkPassword= require("../utils/checkpassword.js");
// Import and initialize router for http requests
const router = require("express").Router();

async function postRegisterUser(req, res) {
  const {password, email} = req.body;

  if ( !password || !email) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    return res.status(400).json({
      success:false,
      message:"Valid email is required"
    })
  }
  

  const userExists = await  userschema.exists({
    email,
  });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User with email already exists",
    });
  }

  const user =  userschema({
    
    password: await hashPassword(password),
    email,
    
  });
  await user.save();

  return res.json({
    success: true,
    message: "User created successfully.",
  });
}
router.post("/register", postRegisterUser);


async function loginUser(req,res){
  const {email,password}= req.body;

  const userExists = await  userschema.findOne({
    email
  });

  if (!userExists) {
    return res.status(400).json({
      success: false,
      message: "User with email doesn't exist",
    });
  }

  const isPasswordCorrect= await checkPassword(password,userExists.password)

  if(!isPasswordCorrect){
    return res.status(400).json({
      success:false,
      message:"Password is incorrect"
    })
  }
  
  return res.json({
    success:true,
    message:"User logged in successfully",
  })
}
router.post("/login",loginUser);
module.exports = router;