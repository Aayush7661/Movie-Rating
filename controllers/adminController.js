const { Movie } = require("../models");

const addMovie = async (req, res) => {
  try {
    const { title, description, releaseYear } = req.body;
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const imageUrl = imageFile.filename;
    const movie = await Movie.create({
      title,
      description,
      releaseYear,
      imageUrl,
    });

    return res.status(201).json({ message: "Movie added successfully", movie });
  } catch (err) {
    return res.status(500).json({ message: "Error adding movie", error: err.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    return res.json({
      statusode: 200,
      status: true,
      movies,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching movies", error: err.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.json({ statusode: 200, status: true, movie });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching movie", error: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, releaseYear } = req.body;
    const imageFile = req.file; // Multer will handle the file upload

    // Find the movie by ID
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update movie fields
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.releaseYear = releaseYear || movie.releaseYear;

    // Update the image URL if a new image is uploaded
    if (imageFile) {
      movie.imageUrl = imageFile.filename; // Save only the image's last name
    }

    await movie.save();

    return res.json({ message: "Movie updated successfully", movie });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating movie", error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.destroy();
    return res.json({ statusode: 200, status: true, message: "Movie deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting movie", error: err.message });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
