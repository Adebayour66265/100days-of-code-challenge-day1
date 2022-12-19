const { Sequelize } = require('sequelize');

const createDB = new Sequelize("Day1", "user", "password", {
    dialect: "sqlite",
    host: "./config/db.sqlite",
});

module.exports = createDB;