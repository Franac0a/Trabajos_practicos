const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Validación de campo obligatorio
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Task;
