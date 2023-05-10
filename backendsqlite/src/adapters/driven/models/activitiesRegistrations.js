const Sequelize = require('sequelize');
const db = require('./database.js');
const activitiesRegistrations = db.define(
  'activitiesRegistrations',
  {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    activityId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'activities',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    indexes: [{ fields: ['activityId', 'userId'], unique: true }],
  }
);
module.exports = activitiesRegistrations;
