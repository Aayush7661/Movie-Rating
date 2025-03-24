module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
    comment: DataTypes.TEXT,
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: true, // Enable automatic timestamps
  });

  return Review;
};
