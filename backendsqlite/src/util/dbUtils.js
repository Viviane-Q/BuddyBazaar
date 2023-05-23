const models = require('../adapters/driven/models/index.js');
const bcrypt = require('bcrypt');
const db = require('../adapters/driven/models/database.js');
const { users, activities, messages } = require('./seedData.js');

module.exports.seedDb = async () => {
  const passhash = await bcrypt.hash('123456', 2);
  const anUser = await models.users.create({
    name: 'Sebastien Viardot',
    email: 'Sebastien.Viardot@grenoble-inp.fr',
    passhash,
  });
  anUser.password = '123456';
  const anUser2 = await models.users.create({
    name: 'Antoine Klein',
    email: 'antoine.klein@grenoble-inp.org',
    passhash,
  });

  const anActivity = await models.activities.create({
    title: 'Une activité',
    description: 'Une description',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-02'),
    numberPersonMax: 5,
    cost: 10,
    place: 'Grenoble',
    longitude: 45.188529,
    latitude: 5.724524,
    category: 'Sport',
    userId: anUser.id,
  });
  const anActivity2 = await models.activities.create({
    title: 'Une activité 2',
    description: 'Une description 2',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-02'),
    numberPersonMax: 2,
    cost: 5,
    place: 'Paris',
    longitude: 48.856614,
    latitude: 2.352222,
    category: 'Art',
    userId: anUser2.id,
  });
  const anActivity3 = await models.activities.create({
    title: 'Un ciné',
    description: 'Un ciné au Pathé',
    startDate: new Date('2024-01-01 20:00:00'),
    endDate: new Date('2024-01-02 22:00:00'),
    numberPersonMax: 4,
    cost: 15,
    place: 'Grenoble',
    longitude: 45.188529,
    latitude: 5.724524,
    category: 'Cinéma',
    userId: anUser2.id,
  });

  const anActivityRegistration = await models.activitiesRegistrations.create({
    userId: anUser.id,
    activityId: anActivity2.id,
  });
  anActivity2.setDataValue('activitiesRegistrations', [anActivityRegistration]);

  const aMessage = await models.messages.create({
    content: 'Un message',
    userId: anUser.id,
    activityId: anActivity2.id,
  });
  aMessage.setDataValue('user', anUser);
  const aMessage2 = await models.messages.create({
    content: 'Un message 2',
    userId: anUser2.id,
    activityId: anActivity2.id,
  });
  aMessage2.setDataValue('user', anUser2);

  return {
    anUser,
    anUser2,
    anActivity,
    anActivity2,
    anActivity3,
    anActivityRegistration,
    aMessage,
    aMessage2,
  };
};

module.exports.cleanDb = async () => {
  await db.sync({
    force: true,
  });
};

module.exports.seedDbProd = async () => {
  // Create every users
  await Promise.all(users.map(async (user) => {
    const passhash = await bcrypt.hash(user.password, 2);
    user.object = await models.users.create({
      name: user.name,
      email: user.email,
      passhash,
    });
  }));

  // Create every activities

  let userIndex = 0;
  let activityIndex = 0;
  while (activityIndex < activities.length) {
    if (userIndex >= users.length) {
      userIndex = 0;
    }
    const anActivity = await models.activities.create({
      title: activities[activityIndex].title,
      description: activities[activityIndex].description,
      startDate: activities[activityIndex].startDate,
      endDate: activities[activityIndex].endDate,
      numberPersonMax: activities[activityIndex].numberPersonMax,
      cost: activities[activityIndex].cost,
      place: activities[activityIndex].place,
      longitude: activities[activityIndex].longitude,
      latitude: activities[activityIndex].latitude,
      category: activities[activityIndex].category,
      userId: users[userIndex].object.id,
    });
    activities[activityIndex].object = anActivity;
    activities[activityIndex].user = users[userIndex].object;
    if (!users[userIndex].activities) {
      users[userIndex].activities = [];
    }
    users[userIndex].activities.push(anActivity);
    userIndex++;
    activityIndex++;
  }
  await Promise.all(activities.map(async (activity) => {
    let numberOfParticipants = Math.floor(1 + Math.random() * (activity.object.numberPersonMax - 1));
    const userIndexes = [];
    while (numberOfParticipants > 0) {
      const userIndex = Math.floor(Math.random() * users.length);
      if (userIndexes.indexOf(userIndex) === -1) {
        userIndexes.push(userIndex);
        numberOfParticipants--;
      }
    }
    await Promise.all(userIndexes.map(async (userIndex) => {
      const anActivityRegistration = await models.activitiesRegistrations.create({
        userId: users[userIndex].object.id,
        activityId: activity.object.id,
      });
      if (!activity.registeredUsers) {
        activity.registeredUsers = [];
      }
      activity.registeredUsers.push(users[userIndex].object);
      activity.object.setDataValue('activitiesRegistrations', [anActivityRegistration]);
    }));
  }));

  // Create a few messages

  activities.map(async (activity) => {
    const numberOfParticipants = activity.registeredUsers.length;
    let numberTotalMessages = Math.floor(numberOfParticipants * Math.random() * 2); // Between 0 and 2 messages per participant
    while (numberTotalMessages > 0) {
      const userIndex = Math.floor(Math.random() * numberOfParticipants);
      const aMessage = await models.messages.create({
        content: messages[Math.floor(Math.random() * messages.length)],
        userId: activity.registeredUsers[userIndex].id,
        activityId: activity.object.id,
      });
      aMessage.setDataValue('user', activity.registeredUsers[userIndex]);
      numberTotalMessages--;
    }
  });
};
