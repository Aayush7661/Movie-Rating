const { User } = require("../models");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error verifying admin role", error: err.message });
  }
};

module.exports = isAdmin;
