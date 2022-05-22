'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Used to add Foreign Key Relations
    }
  }
  Tasks.init({
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 200],
      },
    },
    task_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    task_status: {
      type: DataTypes.ENUM("ToDo", "Doing", "Done"),
      allowNull: false,
    },
    task_end_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};