// Models
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id, status: "active" } });

  if (!meal) {
    return res.status(404).json({
      status: "error",
      message: "Meal not found",
    });
  }

  req.meal = meal;
  next();
});

const mealExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const mealById = await Meal.findOne({
    where: { id, status: "active" },
    attributes: ["id", "name", "price", "status"],
    include: [
      {
        model: Restaurant,
        required: false, // Apply OUTER JOIN
        where: { status: "active" },
        attributes: ["id", "name", "rating", "status"],
      },
    ],
  });

  if (!mealById) {
    return res.status(404).json({
      status: "error",
      message: "Meal not found",
    });
  }

  req.mealById = mealById;
  next();
});

module.exports = { mealExists, mealExistsById };
