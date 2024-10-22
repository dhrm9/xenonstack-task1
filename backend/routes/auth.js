const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();


// Login route
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, 'secretKey', {
      expiresIn: '1h'  // Token expires in 1 hour
    });

    // Send back the token
    res.json({ token, message: 'Login successful' , success:true , user : user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/signup', async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body; 

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          name,
          email,
          password: hashedPassword,
          shortlistedMovies: []
      });

      await newUser.save();
      console.log("New User Created:", newUser);
      res.status(201).json({ message: 'User created successfully', user: newUser , success: true });
  } catch (err) {
      console.error(err); 
      res.status(500).json({ message: 'Error signing up', error: err.message });
  }
});


module.exports = router;
