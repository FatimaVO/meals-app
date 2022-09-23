const { Meal } = require("../models/meal.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const orderMealExists = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meal.findOne({ where: { id: mealId, status: "active" } });

  if (!meal) {
    return res.status(404).json({
      status: "error",
      message: "Meal not found",
    });
  }

  req.meal = meal;
  next();
});

module.exports = { orderMealExists };
