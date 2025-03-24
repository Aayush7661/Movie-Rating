const Joi = require("joi");

// Validation schema for user signup
const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  age: Joi.number().integer().min(1).max(120).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
