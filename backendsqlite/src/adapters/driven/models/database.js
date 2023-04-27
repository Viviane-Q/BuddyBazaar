
// Load Enviroment Variables to process.env (if not present take variables defined in .env file)
require('dotenv').config();
const { DB } = process.env;
const Sequelize = require('sequelize');
const db = new Sequelize({
  dialect: 'sqlite',
  storage: DB,
  logging: false,
});
module.exports = db;
