module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      releaseYear: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  return Movie;
};
