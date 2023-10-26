"use strict";
const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    let timeNow = new Date();
    data.forEach((el) => {
      if (!el.isBlocked) {
        el.isBlocked = false;
      }
      el.createdAt = timeNow;
      el.updatedAt = timeNow;
    });
    await queryInterface.bulkInsert("Posts", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
