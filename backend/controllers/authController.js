import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        error: "User does not exist",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      data: {
        id: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// user account deleted then all refrences should be deleted from everywhere
