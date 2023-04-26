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
    category: 'Sport',
    userId: anUser.id,
  });
  const anActivity2 = await models.activities.create({
    title: 'Une activité 2',
    description: 'Une description 2',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-02'),
    numberPersonMax: 2,
    cost: 15,
    place: 'Grenoble',
    category: 'Art',
    userId: anUser2.id,
  });

  return {
    anUser: anUser,
    anUser2: anUser2,
    anActivity: anActivity,
    anActivity2: anActivity2,
  };
};

module.exports.cleanDb = async () => {
  await db.sync({ force: true });
};
