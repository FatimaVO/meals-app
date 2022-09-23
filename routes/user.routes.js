const express = require("express");

// Controllers
const {
  getAllOrders,
  getOrderById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/user.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const { orderExistsById } = require("../middlewares/order.middlewares");
const {
  protectSession,
  protectUsersAccount,
} = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const userRouter = express.Router();

userRouter.post("/signup", createUserValidators, createUser);
userRouter.post("/login", login);

userRouter.use(protectSession);

userRouter.patch("/:id", userExists, protectUsersAccount, updateUser);
userRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);
userRouter.get("/orders", getAllOrders);
userRouter.get("/orders/:mealId", orderExistsById, getOrderById);

module.exports = { userRouter };
