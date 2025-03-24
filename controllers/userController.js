const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { generateToken } = require("../utils/jwtUtils");

// Signup a new user
const signup = async (req, res) => {
  try {
    const { username, password, email, mobile, age } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      mobile,
      age,
    });

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    return res.json({
      statusode: 200,
      status: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // From authMiddleware

    // Find the user by ID
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }, // Exclude password from the response
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ statusode: 200, status: true, user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching user profile", error: err.message });
  }
};

module.exports = {
  signup,
  login,
  getUserProfile,
};
