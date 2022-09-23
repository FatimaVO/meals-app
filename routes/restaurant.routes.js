const express = require("express");

// Controllers
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/restaurant.controller");

// Middlewares
const {
  protectSession,
  protectAdmin,
  protectReviewsOwners,
} = require("../middlewares/auth.middlewares");

const {
  createRestaurantValidators,
} = require("../middlewares/validators.middlewares");

const {
  restaurantExists,
  restaurantExistsById,
} = require("../middlewares/restaurant.middlewares");
const { reviewExists } = require("../middlewares/review.middlewares");

const restaurantRouter = express.Router();

restaurantRouter.get("/", getAllRestaurants);
restaurantRouter.get("/:id", restaurantExistsById, getRestaurantById);

restaurantRouter.use(protectSession);

restaurantRouter.post("/", createRestaurantValidators, createRestaurant);
restaurantRouter.patch(
  "/:restaurantId",
  restaurantExists,
  protectAdmin,
  updateRestaurant
);
restaurantRouter.delete(
  "/:restaurantId",
  restaurantExists,
  protectAdmin,
  deleteRestaurant
);
restaurantRouter.post("/reviews/:restaurantId", restaurantExists, createReview);
restaurantRouter.patch(
  "/reviews/:id",
  reviewExists,
  protectReviewsOwners,
  updateReview
);
restaurantRouter.delete(
  "/reviews/:id",
  reviewExists,
  protectReviewsOwners,
  deleteReview
);

module.exports = { restaurantRouter };
