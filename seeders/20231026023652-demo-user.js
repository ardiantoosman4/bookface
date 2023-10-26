"use strict";
const fs = require("fs");
const bcrypt = require("bcryptjs");
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
    let data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    let timeNow = new Date();
    const salt = bcrypt.genSaltSync(10);
    data.forEach((el) => {
      el.password = bcrypt.hashSync(el.password, salt);
      el.createdAt = timeNow;
      el.updatedAt = timeNow;
    });
    await queryInterface.bulkInsert("Users", data, { individualHooks: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
