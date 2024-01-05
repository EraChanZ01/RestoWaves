'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('size', [
      {
        name: "36"
      },
      {
        name: "37"
      },
      {
        name: "38"
      },
      {
        name: "39"
      },
      {
        name: "40"
      },
      {
        name: "41"
      },
      {
        name: "42"
      },
      {
        name: "43"
      },
      {
        name: "44"
      },
      {
        name: "45"
      },
      {
        name: "46"
      },
    ], {});
  },
};
