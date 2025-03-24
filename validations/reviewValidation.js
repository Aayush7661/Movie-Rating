const Joi = require("joi");

// Validation schema for adding a review
const addReviewSchema = Joi.object({
  movieId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
});

// Validation schema for updating a review
const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string(),
}).min(1); // At least one field is required for update

module.exports = {
  addReviewSchema,
  updateReviewSchema,
};
