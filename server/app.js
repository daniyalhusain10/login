const express = require('express')
const app = express()
const port = process.env.PORT || 5000 ;
const bodyParser = require('body-parser')
const userModel = require('./models/user_model.js')
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
require('dotenv').config({debug: true});
const { generateToken } = require('./utils/jwt.js');
const {redirectIfAuthenticated} = require('./middleware/auth.js')
const {forgetPassword} = require('./middleware/auth.js')
const {varifyPassword} = require('./middleware/auth.js')

app.use(cors({
  origin: 'http://localhost:5173', // React app ka URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
  credentials: true,
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch((err) => console.error(' MongoDB connection error:', err));

const appuUrl = 'https://login-system-production-be34signup.up.railway.app/'

app.get(`${appUrl}/validate`, redirectIfAuthenticated, (req, res) => {
  // At this point, token is already verified and user is attached to req.user
  res.json({ loggedIn: true, });
});

app.post(`${appUrl}/forget-password`,forgetPassword,async (req,res)=>{
   res.json({success: true, message : "password forgeted"})
})
app.post(`${appUrl}/reset-password`,varifyPassword,async (req,res)=>{
    res.status(200).json({success: true})
});

app.post(`${appUrl}/signup`, async function(req, res) {
  const { username, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = generateToken(user);
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.json({ success: true, message: "User Created  ,,,", loggedIn: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Signup failed ,,, " });
  }
});


app.post(`${appUrl}/login`,async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Exist,,," });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password,,," });
    }

 const token = generateToken(user);
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ success: true, loggedIn: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed,,," });
  }
});

app.get(`${appUrl}/logout`, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // set to true in production with HTTPS
  });
  res.json({ success: true, message: "Logged out" });
  
});


app.listen(5000,()=>{
    console.log(`server is running on port: ${port}`);
});
module.exports = app
