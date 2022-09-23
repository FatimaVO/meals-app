const express = require("express");

// Controllers
const {
  createOrder,
  getAllOrders,
  completeOrder,
  cancelOrder,
} = require("../controllers/order.controller");

// Middlewares
const { orderExists } = require("../middlewares/order.middlewares");
const { orderMealExists } = require("../middlewares/orderMeal.middleware");
const { protectSession } = require("../middlewares/auth.middlewares");
const { protectOrdersOwners } = require("../middlewares/auth.middlewares");

const orderRouter = express.Router();

orderRouter.use(protectSession);

orderRouter.post("/", orderMealExists, createOrder);
orderRouter.get("/me", getAllOrders);
orderRouter.patch("/:id", orderExists, protectOrdersOwners, completeOrder);
orderRouter.delete("/:id", orderExists, protectOrdersOwners, cancelOrder);

module.exports = { orderRouter };
