const { Movie, Review, User } = require("../models");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    return res.json({ statusode: 200, status: true, movies });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching movies", error: err.message });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id, {
      include: [
        {
          model: Review,
          include: [{ model: User }],
          required: false,
        },
      ],
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ statusCode: 200, status: true, movie });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching movie details", error: err.message });
  }
};

module.exports = { getAllMovies, getMovieDetails };
