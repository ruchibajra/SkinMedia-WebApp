const User = require("../models/authUserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserProfileModel = require("../models/userProfileModel");

dotenv.config();

const registerUser = async (req, res) => {
  const { username, phone, email, password, role } = req.body;

  console.log("Received data:", req.body); // Add this line to debug


  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      phone,
      email,
      password,
      role,
    });

    // console.log(user.role);

    await user.save();

    // create profile for new user at the time of registration
    const newProfile = new UserProfileModel({ user: user._id });
    await newProfile.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: user,
      UserProfileModel: newProfile,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Received data:", req.body); // Add this line to debug


  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

     // Check if the user account is disabled
     if (user.disabled) {
      return res.status(403).json({ msg: "Account disabled. Please contact support." });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username
      },
    };

    console.log('Payload:', payload);


    // generates token
    jwt.sign(
      payload,
      
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "user logged in successfully",
          token: `Bearer ${token}`,
          user: user,
        });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, 'username email role disabled'); // Fetch only necessary fields

    if (!users) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json({
      msg: "Users fetched successfully",
      users: users,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

// Disable a user account
const disableUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and update the `disabled` field to true
    let user = await User.findByIdAndUpdate(
      userId,
      { disabled: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User account disabled successfully",
      user: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

// Enable a user account
const enableUser = async (req, res) => {
  const { userId } = req.params;

  try {
    let user = await User.findByIdAndUpdate(
      userId,
      { disabled: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User account enabled successfully",
      user: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

module.exports = {
  registerUser,
  loginUser,
  disableUser,
  getAllUsers,
  enableUser,
};