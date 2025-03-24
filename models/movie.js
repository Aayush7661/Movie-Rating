module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      releaseYear: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING, // Store only the image's last name (e.g., "image.jpg")
    },
    {
      timestamps: true, // Enable automatic timestamps
    }
  );

  return Movie;
};
