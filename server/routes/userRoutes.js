const express  = require('express');
const router   = express.Router();
const config   = require("../config/database");
const jwt      = require('jsonwebtoken');

//Models
const User = require('../models/User');

// @route   POST api/users/register
// @desc    Add User Information to Database
// @access  Public
router.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  
  User.addUser(newUser, (err) => { 
    if(err) {
      res.json({success: false, msg: 'Failed to Register User'});
    } else {
      res.json({success: true, msg: 'Registration Successful'});
    } 
  });
});

// @route   POST api/users/authenticate
// @desc    Check If Password is Correct
// @access  Public
router.post("/authenticate", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err; 
    if(!user) return res.json({success: false, msg: `${username} is not a registered user`}); 

    User.comparePassword(password, user.password, (err, isMatch) => { 
      if(err) throw err;
      if(isMatch){

        const token = jwt.sign({data: user}, config.secret, {
         expiresIn: 21600 //6 hours
        });

        res.json({
          user: {
            id:user._id,
            username: user.username
          },
          token: `bearer ${token}`,
          success: true,
          msg: "Log In Successful"
        });
      } else {
        res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

module.exports = router;