import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", process.env.JWT_SECRET);
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
  }
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User registered successfully",token,
      user:{id:user._id,username:user.username},
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
     console.log("Login attempt:", username, password);
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch){
      console.log("password mismatch")
       return res.status(400).json({ message: "Invalid username or password" });
    }
    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message:"login successful",token, username: user.username });
  } catch (err) {
    console.error("login error",err);
    res.status(500).json({ message: "Server error" });
  }
};
