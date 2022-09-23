const express = require("express");

// Controllers
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require("../controllers/meal.controller");

// Middlewares
const {
  mealExists,
  mealExistsById,
} = require("../middlewares/meal.middlewares");
const { restaurantExists } = require("../middlewares/restaurant.middlewares");
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createMealsValidators,
} = require("../middlewares/validators.middlewares");

const mealRouter = express.Router();

mealRouter.get("/", getAllMeals);
mealRouter.get("/:id", mealExistsById, getMealById);

mealRouter.use(protectSession);

mealRouter.post(
  "/:restaurantId",
  restaurantExists,
  createMealsValidators,
  createMeal
);
mealRouter.patch("/:id", mealExists, protectAdmin, updateMeal);
mealRouter.delete("/:id", mealExists, protectAdmin, deleteMeal);

module.exports = { mealRouter };
