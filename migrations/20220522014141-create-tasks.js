'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      task_description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      task_status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["ToDo", "Doing", "Done"]
      },
      task_end_date_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};