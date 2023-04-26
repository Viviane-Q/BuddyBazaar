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

  const anActivity = await models.activities.create({
    title: 'Une activité',
    description: 'Une description',
    startDate: new Date('2021-01-01'),
    endDate: '2021-01-02',
    numberPersonMax: 5,
    cost: 10,
    place: 'Grenoble',
    category: 'Sport',
    userId: anUser.id,
  });

  return {
    anUser: anUser,
    anActivity: anActivity,
  };
};

module.exports.cleanDb = async () => {
  await db.sync({ force: true });
};
