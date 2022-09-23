const express = require("express");

// Routers
const { userRouter } = require("./routes/user.routes");
const { restaurantRouter } = require("./routes/restaurant.routes");
const { mealRouter } = require("./routes/meal.routes");
const { orderRouter } = require("./routes/order.routes");

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/orders", orderRouter);

// Global error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "fail";

  res.status(statusCode).json({
    status,
    message: error.message,
    error,
    stack: error.stack,
  });
});

// Catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
