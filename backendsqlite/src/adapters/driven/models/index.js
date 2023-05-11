const users = require('./users');
const activities = require('./activities');
const activitiesRegistrations = require('./activitiesRegistrations');
const messages = require('./messages');

// relationships
users.hasMany(activities, { foreignKey: 'userId' });
activities.belongsTo(users, { foreignKey: 'userId' });

users.hasMany(activitiesRegistrations, { foreignKey: 'userId' });
activitiesRegistrations.belongsTo(users, { foreignKey: 'userId' });

activities.hasMany(activitiesRegistrations, { foreignKey: 'activityId' });
activitiesRegistrations.belongsTo(activities, { foreignKey: 'activityId' });

activities.hasMany(messages, { foreignKey: 'activityId' });
messages.belongsTo(activities, { foreignKey: 'activityId' });

users.hasMany(messages, { foreignKey: 'userId' });
messages.belongsTo(users, { foreignKey: 'userId' });

const models = {
  users,
  activities,
  activitiesRegistrations,
  messages,
};

module.exports = models;
