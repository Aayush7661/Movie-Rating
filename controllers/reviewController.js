const { Review, User, Movie } = require("../models");

const addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.userId; // From authMiddleware
    const review = await Review.create({
      rating,
      comment,
      MovieId: movieId,
      UserId: userId,
    });
    res.status(201).json(review);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error adding review", error: err.message });
  }
};

const editReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.findByPk(id);
    if (!review || review.UserId !== req.userId) {
      return res.status(403).json({ message: "You cannot edit this review" });
    }
    review.rating = rating;
    review.comment = comment;
    await review.save();
    return res.json({ statusode: 200, status: true, review });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error editing review", error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review || review.UserId !== req.userId) {
      return res.status(403).json({ message: "You cannot delete this review" });
    }
    await review.destroy();
    return res.json({
      statusode: 200,
      status: true,
      message: "Review deleted",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting review", error: err.message });
  }
};

const likeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.likes = (review.likes || 0) + 1; // Increment likes
    await review.save();
    return res.json({ statusode: 200, status: true, review });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error liking review", error: err.message });
  }
};

const getSortedReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { sortBy } = req.query; // 'popular' or 'recent'
    let order = [];
    if (sortBy === "popular") {
      order = [["likes", "DESC"]];
    } else if (sortBy === "recent") {
      order = [["createdAt", "DESC"]];
    }
    const reviews = await Review.findAll({
      where: { MovieId: movieId },
      order,
      include: ["User"], // Include user details
    });
    return res.json({ statusode: 200, status: true, reviews });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching reviews", error: err.message });
  }
};

module.exports = {
  addReview,
  editReview,
  deleteReview,
  likeReview,
  getSortedReviews,
};
