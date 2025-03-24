const express = require("express");
const {
  signup,
  login,
  getUserProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validationMiddleware");
const { signupSchema, loginSchema } = require("../validations/userValidation");

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
