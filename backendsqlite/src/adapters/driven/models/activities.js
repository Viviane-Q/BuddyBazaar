const Sequelize = require('sequelize');
const db = require('./database.js');
const { Category } = require('../../../domain/entities/Activity');

const activities = db.define(
  'activities',
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(128),
      validate: {
        is: /^[a-z\-'\s]{1,128}$/i,
      },
    },
    description: {
      type: Sequelize.STRING(500),
    },
    dateTime: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
    numberPersonMax: {
      type: Sequelize.INTEGER,
    },
    cost: {
      type: Sequelize.INTEGER,
    },
    place: {
      type: Sequelize.STRING(128),
      validate: {
        is: /^[a-z\-'\s]{1,128}$/i,
      },
    },
    category: {
      type: Category,
    },
    duration: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },

  },
  { timestamps: false }
);
module.exports = activities;
