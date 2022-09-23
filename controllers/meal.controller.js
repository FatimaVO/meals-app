// Models
const { Restaurant } = require("../models/restaurant.model");
const { Meal } = require("../models/meal.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createMeal = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId,
  });

  res.status(201).json({
    status: "success",
    data: { newMeal },
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    attributes: ["id", "name", "price", "status"],
    where: { status: "active" },
    required: false,
    include: [
      {
        model: Restaurant,
        required: false,
        where: { status: "active" },
        attributes: ["id", "name", "rating", "status"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      meals,
    },
  });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { mealById } = req;

  res.status(200).json({
    status: "success",
    data: { mealById },
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "deleted" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
