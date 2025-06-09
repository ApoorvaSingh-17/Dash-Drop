
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import bcrypt from 'bcryptjs';

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Wrong username");
      return res.status(404).json({ message: "Username does not exist!" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Wrong password");
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role, // helpful in auth middleware
      },
      process.env.PASS_SEC,
      { expiresIn: "30d" }
    );

    // Respond with the token and user info
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isStaff: user.isStaff,
        role: user.role,
        staffRequest: user.staffRequest,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export default loginController;

//Register Callback

const registerController = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      staffRequest: req.body.staffRequest || false, // default to false,
      role: "User", // always "User" by default
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      // newUser,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        staffRequest: newUser.staffRequest,
      },
    });
  } catch (error) {
    // res.status(400).json({
    //     success: false,
    //     error,
    // });
    // console.log("errorrrrrr");
    console.error("Registration Error:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Registration failed",
    });
  }
};

export { loginController, registerController };