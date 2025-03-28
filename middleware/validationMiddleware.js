const { BadRequestError } = require("../utils/errors");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }
    next();
  };
};

module.exports = validateRequest;
