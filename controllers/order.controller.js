// Models
const { Order } = require("../models/order.model");
const { Restaurant } = require("../models/restaurant.model");
const { Meal } = require("../models/meal.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createOrder = catchAsync(async (req, res, next) => {

  const { mealId, quantity } = req.body;
  const { sessionUser } = req;
  const { meal } = req;
  const price = meal.price;
  const quantityPriceMeal = price * quantity;

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice: quantityPriceMeal,
    quantity,
  });

  res.status(201).json({
    status: "success",
    data: { newOrder },
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {

  const { sessionUser } = req;

  const orders = await Order.findAll({
    attributes: ["id", "totalPrice", "quantity", "status"],
    where: { userId: sessionUser.id },
    required: false,
    include: [
      {
        model: Meal,
        required: false,
        where: { status: "active" },
        attributes: ["id", "name", "price", "status"],
        include: [
          {
            model: Restaurant,
            required: false,
            where: { status: "active" },
            attributes: ["id", "name", "rating", "status"],
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

const completeOrder = catchAsync(async (req, res, next) => {

  const { order } = req;

  await order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const cancelOrder = catchAsync(async (req, res, next) => {
  
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createOrder,
  getAllOrders,
  completeOrder,
  cancelOrder,
};
