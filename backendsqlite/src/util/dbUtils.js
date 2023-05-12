const models = require('../adapters/driven/models/index.js');
const bcrypt = require('bcrypt');
const db = require('../adapters/driven/models/database.js');

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
