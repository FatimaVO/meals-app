// Models
const { Meal } = require("./meal.model");
const { Order } = require("./order.model");
const { Restaurant } = require("./restaurant.model");
const { Review } = require("./review.model");
const { User } = require("./user.model");

const initModels = () => {
  //1 meal <-----> 1 order
  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);

  // 1 User <----> M Orders
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  // 1 Restaurat <----> M Meals
  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);

  // 1 Restaurat <----> M Reviews
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  // 1 User <----> M Reviews
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);
};

module.exports = { initModels };
