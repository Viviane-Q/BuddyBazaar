const Sequelize = require('sequelize');
const db = require('./database.js');

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
    },
    description: {
      type: Sequelize.STRING(500),
    },
    startDate: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
    endDate: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
    numberPersonMax: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    cost: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    place: {
      type: Sequelize.STRING,
    },
    longitude: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: true,
        min: -180,
        max: 180,
      },
    },
    latitude: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: true,
        min: -90,
        max: 90,
      },
    },
    category: {
      type: Sequelize.STRING,
      validate: {
        isIn: [
          [
            'Sport',
            'Livre',
            'Art',
            'Bar',
            'Cinéma',
            'Jeux de société',
            'Musique',
            'Travaux manuels',
            'Autre',
          ],
        ],
      },
    },
  },
  { timestamps: false }
);

module.exports = activities;
