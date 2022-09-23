const { DataTypes, db } = require("../utils/database.util");

const Review = db.define("review", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  comment: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  restaurantId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    defaultValue: "active",
    type: DataTypes.STRING,
  },
});

module.exports = { Review };
