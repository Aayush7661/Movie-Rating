const Joi = require("joi");

const addMovieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

const updateMovieSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  releaseYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
}).min(1);

module.exports = {
  addMovieSchema,
  updateMovieSchema,
};
