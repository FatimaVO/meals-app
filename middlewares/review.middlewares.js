// Models
const { Review } = require("../models/review.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const reviewExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: { id },
  });

  if (!review) {
    return res.status(404).json({
      status: "error",
      message: "Review not found",
    });
  }

  req.review = review;
  next();
});

module.exports = { reviewExists };
