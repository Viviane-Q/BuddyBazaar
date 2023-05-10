const users = require('./users');
const activities = require('./activities');
const activitiesRegistrations = require('./activitiesRegistrations');

// relationships
users.hasMany(activities, { foreignKey: 'userId' });
activities.belongsTo(users, { foreignKey: 'userId' });

users.hasMany(activitiesRegistrations, { foreignKey: 'userId' });
activitiesRegistrations.belongsTo(users, { foreignKey: 'userId' });

activities.hasMany(activitiesRegistrations, { foreignKey: 'activityId' });
activitiesRegistrations.belongsTo(activities, { foreignKey: 'activityId' });

const models = {
  users,
  activities,
  activitiesRegistrations,
};

module.exports = models;
