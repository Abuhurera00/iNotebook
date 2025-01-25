


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

//Route:1 Create a User using: Post "/api/auth/createuser" no login required Doesn't require auth
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // if there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

  // Create a new user instance
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
  });

  // Save the new user to the database
  const savedUser = await newUser.save();


  // using jwt for sending authtoken to the user on login
  const data = {
    user:{
      id: savedUser.id
    }
  }
  
const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json(savedUser);
    success= true;
    res.json({success, authtoken});

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal server error occured");
  }
});

//Route:2 Authenticate a user using: Post "/api/auth/login" no login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
 // if there are errors return bad request and the errors
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }

 const {email, password} = req.body
  try {
    let user = await User.findOne({email})
    if(!user){
      success = false;
      return res.status(400).json({error: "please try to login with correct crediantials"});
    }

    const passwordcompare = await bcrypt.compare(password, user.password);
    if(!passwordcompare){
      success = false;
      return res.status(400).json({success, error: "please try to login with correct crediantials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    
    success = true;
  const authtoken = jwt.sign(data, JWT_SECRET);
  res.json({success, authtoken});


  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send("Internal server error occured");
  }

})
//Route:3 get logged in user detais using: Post "/api/auth/getuser" login required 
router.post('/getuser', fetchuser ,  async (req, res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error('Error creating user:', error);
  res.status(500).send("Internal server error occured");
}
})

module.exports = router;
   