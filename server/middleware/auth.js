// File: middleware/auth.js
const app = require('../app.js')
const jwt = require("jsonwebtoken");
const userModel = require('../models/user_model.js')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
function redirectIfAuthenticated(req, res, next) {
  const token = req.cookies.token; // correct variable name

  if (!token) {
    return res.status(401).json({ success: false, noToken:true, message: "Unauthorized: No token,,," });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next(); // ✅ allow request to continue
  } catch (err) {
    console.log("Invalid token", err.message);
    return res.status(401).json({ success: false, message: "Invalid token,,," });
  }
}
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {

      return res.status(404).json({ noEmail: true, message: "Please provide an email" });
    }

    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {

      return res.status(400).json({ noExist: true, message: "Invalid email" });
    }

    const tokenF = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.MY_GMAIL_NAME,
        pass: process.env.APP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.MY_GMAIL_NAME,
      to: email,
      subject: 'Reset Password',
      html:`
        <p>Here is your password reset token:</p>
        <p style="font-weight: bold;">${tokenF}</p>
        <p style="color: red;"><strong>Do not share this code.</strong></p>
     `
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    res.status(200).json({
      codeSend: true,
      message: "Code sent successfully",
      info: mailResponse.response
    });

  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};


 const varifyPassword = async (req, res) => {
  try {

    const { code, password } = req.body;
    const decoded = jwt.verify(code,process.env.JWT_SECRET);
    const {email} = decoded;
    
    const user = await userModel.findOne({email});
    if (!user){
      return res.status(404).json({ noUser: false, message: "User not found" });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const updateUser = await userModel.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    if (!updateUser) {
      return res.status(500).json({ notUpdated: false, message: "User not updated" });
    }

    res.status(200).json({ updatedPassword: true, message: "Password updated successfully" });


  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};


module.exports = { redirectIfAuthenticated,
  forgetPassword,
  varifyPassword
 };
