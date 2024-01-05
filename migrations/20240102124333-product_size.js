'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_size', {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'product', // Название связанной таблицы
          key: 'id' // Поле, на которое ссылается внешний ключ
        }
      },
      size_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'size', // Название связанной таблицы
          key: 'id' // Поле, на которое ссылается внешний ключ
        },
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_size');
  }
};
