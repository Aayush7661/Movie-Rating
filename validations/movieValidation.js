const Joi = require("joi");

// Validation schema for adding a movie
const addMovieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

// Validation schema for updating a movie
const updateMovieSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  releaseYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
}).min(1); // At least one field is required for update

module.exports = {
  addMovieSchema,
  updateMovieSchema,
};
