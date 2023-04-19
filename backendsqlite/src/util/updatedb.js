const models = require("../adapters/driven/models/index.js");
const bcrypt = require("bcrypt");
const db = require("../adapters/driven/models/database.js");
// Ajouter ici les nouveaux require des nouveaux modèles

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await db.sync({ force: true });
  console.log("Base de données créée.");
  // Initialise la base avec quelques données
  const passhash = await bcrypt.hash("123456", 2);
  await models.users.create({
    name: "Sebastien Viardot",
    email: "Sebastien.Viardot@grenoble-inp.fr",
    passhash,
  });
  // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
})();
