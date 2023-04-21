const seedDb = require('./dbUtils').seedDb;
const cleanDb = require('./dbUtils').cleanDb;
// Ajouter ici les nouveaux require des nouveaux modèles

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await cleanDb();
  console.log('Base de données créée.');
  // Initialise la base avec quelques données
  await seedDb();
  // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
})();
