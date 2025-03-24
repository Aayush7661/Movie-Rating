const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user")(sequelize, DataTypes);
const Movie = require("./movie")(sequelize, DataTypes);
const Review = require("./review")(sequelize, DataTypes);

User.hasMany(Review, { foreignKey: "UserId" });
Review.belongsTo(User, { foreignKey: "UserId" });
Movie.hasMany(Review, { foreignKey: "MovieId" });
Review.belongsTo(Movie, { foreignKey: "MovieId" });

module.exports = {
  sequelize,
  User,
  Movie,
  Review,
};
