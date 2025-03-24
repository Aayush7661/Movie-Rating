const { BadRequestError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
};

module.exports = errorHandler;
