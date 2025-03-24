const Joi = require("joi");

const addReviewSchema = Joi.object({
  movieId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
});

const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string(),
}).min(1);

module.exports = {
  addReviewSchema,
  updateReviewSchema,
};
