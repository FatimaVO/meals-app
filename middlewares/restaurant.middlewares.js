// Models
const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const restaurantExists = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id: restaurantId, status: "active" },
  });

  if (!restaurant) {
    return res.status(404).json({
      status: "error",
      message: "Restaurant not found",
    });
  }

  req.restaurant = restaurant;
  next();
});

const restaurantExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurantById = await Restaurant.findOne({
    where: { id, status: "active" },
    required: false,
    include: [
      {
        model: Review,
        required: false,
        where: { status: "active" },
        attributes: ["id", "comment", "rating", "status"],
        include: [
          {
            model: User,
            required: false,
            where: { status: "active" },
            attributes: { exclude: ["password"] },
          },
        ],
      },
    ],
  });

  if (!restaurantById) {
    return res.status(404).json({
      status: "error",
      message: "Restaurant not found",
    });
  }

  req.restaurantById = restaurantById;
  next();
});

module.exports = { restaurantExists, restaurantExistsById };
