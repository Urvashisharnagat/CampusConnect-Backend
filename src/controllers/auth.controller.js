const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


// Register
async function registerUser (req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });

   
      const token = jwt.sign(
       { id:user._id,
        role:user.role
        },
       process.env.JWT_SECRET,
     )

     res.cookie("token",token)
   
    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
       { id:user._id,
        role:user.role
        },
       process.env.JWT_SECRET,
       { expiresIn: "7d" }
     )

     res.cookie("token",token)

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {registerUser,loginUser}