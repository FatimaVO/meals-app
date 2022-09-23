// Models
const { Order } = require("../models/order.model");
const { Restaurant } = require("../models/restaurant.model");
const { Meal } = require("../models/meal.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id, status: "active" } });

  if (!order) {
    return res.status(404).json({
      status: "error",
      message: "Order not found",
    });
  }

  req.order = order;
  next();
});

const orderExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const orderById = await Order.findOne({
    attributes: ["id", "totalPrice", "quantity", "status"],
    where: { id, userId: sessionUser.id },
    include: [
      {
        model: Meal,
        required: false,
        where: { status: "active" },
        attributes: ["id", "name", "price", "status"],
        include: [
          {
            model: Restaurant,
            required: false, // Apply OUTER JOIN
            where: { status: "active" },
            attributes: ["id", "name", "rating", "status"],
          },
        ],
      },
    ],
  });

  if (!orderById) {
    return res.status(404).json({
      status: "error",
      message: "Order not found",
    });
  }

  req.order = orderById;
  next();
});

module.exports = { orderExists, orderExistsById };
