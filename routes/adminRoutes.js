const express = require("express");
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/adminController");
const {
  addMovieSchema,
  updateMovieSchema,
} = require("../validations/movieValidation");
const validateRequest = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../utils/multer");

const router = express.Router();

router.post(
  "/movies",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  validateRequest(addMovieSchema),
  addMovie
);

router.put(
  "/movies/:id",
  authMiddleware,
  isAdmin,
  upload.single("image"), // Use Multer to handle file uploads
  validateRequest(updateMovieSchema),
  updateMovie
);
router.get("/movies", authMiddleware, isAdmin, getAllMovies);
router.get("/movies/:id", authMiddleware, isAdmin, getMovieById);

router.delete("/movies/:id", authMiddleware, isAdmin, deleteMovie);

module.exports = router;
