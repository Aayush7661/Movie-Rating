const Joi = require("joi");

// Validation schema for user signup
const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
