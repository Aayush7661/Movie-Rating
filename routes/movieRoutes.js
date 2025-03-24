const express = require("express");
const {
  getAllMovies,
  getMovieDetails,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieDetails);

module.exports = router;
