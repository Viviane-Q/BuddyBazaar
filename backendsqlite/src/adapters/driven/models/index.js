const users = require('./users');
const activities = require('./activities');

// relationships
users.hasMany(activities, { foreignKey: 'userId' });
activities.belongsTo(users, { foreignKey: 'userId' });

const models = {
  users,
  activities
};

module.exports = models;
