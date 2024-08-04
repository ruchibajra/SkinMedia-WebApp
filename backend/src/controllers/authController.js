const User = require('../models/authUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserProfileModel = require('../models/userProfileModel');

dotenv.config();

const registerUser = async (req, res) => {
    const { name, username, phone, email, password, confirmPassword, role} = req.body;

    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({
            name,
            username,
            phone,
            email,
            password,
            confirmPassword,
            role
        });

        await user.save();

        // create profile for new user at the time of registration
        const newProfile = new UserProfileModel({user : user._id});
        await newProfile.save();

        res
        .status(201)
        .json({
          msg: "User registered successfully",
          user: user,
          UserProfileModel : newProfile,
        });
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error!');
        }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      // generates token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ msg: "user logged in successfully", token: `Bearer ${token}`, user: user });
        }
      );
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  module.exports = {
    registerUser,
    loginUser,
  };