const users = require('./users');
const activities = require('./activities');
const activitiesRegistrations = require('./activitiesRegistrations');

// relationships
users.hasMany(activities, { foreignKey: 'userId' });
activities.belongsTo(users, { foreignKey: 'userId' });

const models = {
  users,
  activities,
  activitiesRegistrations,
};

module.exports = models;
