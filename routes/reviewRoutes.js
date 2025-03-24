const express = require("express");
const {
  addReview,
  editReview,
  deleteReview,
  likeReview,
  getSortedReviews,
} = require("../controllers/reviewController");
const {
  addReviewSchema,
  updateReviewSchema,
} = require("../validations/reviewValidation");
const validateRequest = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, validateRequest(addReviewSchema), addReview);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(updateReviewSchema),
  editReview
);
router.delete("/:id", authMiddleware, deleteReview);
router.post("/:id/like", authMiddleware, likeReview);
router.get("/movie/:movieId", getSortedReviews);

module.exports = router;
