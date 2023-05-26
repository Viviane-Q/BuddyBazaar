
const messages = [
  'Ça te tente ?',
  'On y va ensemble ?',
  'C\'est sympa !',
  'Ça promet d\'être amusant !',
  'Je recommande vivement !',
  'J\'y suis déjà allé(e), c\'était super !',
  'C\'est une expérience à ne pas manquer !',
  'Je suis partant(e) !',
  'Ça vaut le détour !',
  'Je te rejoins là-bas !',
  'Ça te dit de participer ?',
  'C\'est vraiment cool !',
  'Salut ! Comment ça va ?',
  'Quoi de neuf ?',
  'Tu as des projets pour aujourd\'hui ?',
  'J\'ai passé une excellente journée !',
  'Je suis en train de regarder une série intéressante.',
  'Que penses-tu de cette nouvelle chanson ?',
  'Quel est ton plat préféré ?',
  'As-tu des vacances prévues prochainement ?',
  'Je viens de rentrer chez moi après une longue journée de travail.',
  'Tu veux sortir ce soir ?',
  'Quel est ton livre préféré ?',
  'Je suis en train de planifier mes prochaines vacances.',
];
const users = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    password: 'abc123'
  },
  {
    name: 'Michael Johnson',
    email: 'michaeljohnson@example.com',
    password: 'pass1234'
  },
  {
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    password: 'qwerty123'
  },
  {
    name: 'David Brown',
    email: 'davidbrown@example.com',
    password: 'testpass'
  },
  {
    name: 'Sarah Wilson',
    email: 'sarahwilson@example.com',
    password: 'password321'
  },
  {
    name: 'James Anderson',
    email: 'jamesanderson@example.com',
    password: 'securepass'
  },
  {
    name: 'Jessica Taylor',
    email: 'jessicataylor@example.com',
    password: 'mypassword'
  },
  {
    name: 'Daniel Thomas',
    email: 'danielthomas@example.com',
    password: 'thepass'
  },
  {
    name: 'Olivia White',
    email: 'oliviawhite@example.com',
    password: 'pass123'
  },
  {
    name: 'Matthew Lee',
    email: 'matthewlee@example.com',
    password: 'password456'
  },
  {
    name: 'Ava Martinez',
    email: 'avamartinez@example.com',
    password: '12345678'
  },
  {
    name: 'William Garcia',
    email: 'williamgarcia@example.com',
    password: 'p@ssw0rd'
  },
  {
    name: 'Sophia Robinson',
    email: 'sophiarobinson@example.com',
    password: 'letmein'
  },
  {
    name: 'Joseph Clark',
    email: 'josephclark@example.com',
    password: 'passw0rd!'
  },
  {
    name: 'Mia Rodriguez',
    email: 'miarodriguez@example.com',
    password: 'password789'
  }
];

const today = new Date();

const activities = [
  {
    title: 'Randonnée au bord de la mer',
    description: 'Profitez d\'une magnifique randonnée sur les falaises de la Côte d\'Opale',
    startDate: new Date(today.getTime() + (2 * 60 * 60 * 1000)), // Start date: 2 hours from now
    endDate: new Date(today.getTime() + (5 * 60 * 60 * 1000)), // End date: 5 hours from now
    numberPersonMax: 6,
    cost: 0,
    place: 'Étretat, Normandie',
    latitude: 49.707219,
    longitude: 0.206348,
    category: 'Sport',
  },
  {
    title: 'Club de lecture au café',
    description: 'Rencontre conviviale pour échanger sur vos dernières lectures autour d\'un café',
    startDate: new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000)), // Start date: 1 day from now
    endDate: new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000)), // End date: 1 day from now + 3 hours
    numberPersonMax: 4,
    cost: 3,
    place: 'Café Le Petit Littéraire, Lyon',
    latitude: 45.757814,
    longitude: 4.835293,
    category: 'Livre',
  },
  {
    title: 'Atelier de peinture en plein air',
    description: 'Exprimez votre créativité lors d\'une séance de peinture en plein air dans le parc du Château de Versailles',
    startDate: new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)), // Start date: 3 days from now
    endDate: new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000) + (4 * 60 * 60 * 1000)), // End date: 3 days from now + 4 hours
    numberPersonMax: 8,
    cost: 10,
    place: 'Parc du Château de Versailles, Versailles',
    latitude: 48.804865,
    longitude: 2.120355,
    category: 'Art',
  },
  {
    title: 'Soirée jeux de société chez moi',
    description: 'Venez passer une soirée conviviale autour de jeux de société dans une ambiance chaleureuse',
    startDate: new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000)), // Start date: 1 day from now
    endDate: new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000)), // End date: 1 day from now + 5 hours
    numberPersonMax: 10,
    cost: 0,
    place: 'Rue des Mésanges, Bordeaux',
    latitude: 44.837912,
    longitude: -0.579541,
    category: 'Jeux de société',
  },
  {
    title: 'Concert acoustique dans mon jardin',
    description: 'Venez écouter de la musique live dans une ambiance intime et détendue au cœur de mon jardin',
    startDate: new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000)), // Start date: 2 days from now
    endDate: new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000)), // End date: 2 days from now + 2 hours
    numberPersonMax: 15,
    cost: 5,
    place: 'Rue des Violettes, Toulouse',
    latitude: 43.615154,
    longitude: 1.447546,
    category: 'Musique',
  },
  {
    title: 'Atelier de poterie créative',
    description: 'Explorez votre créativité en créant des pièces uniques lors d\'un atelier de poterie dans mon atelier',
    startDate: new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)), // Start date: 3 days from now
    endDate: new Date(today.getTime() + (4 * 24 * 60 * 60 * 1000)), // End date: 4 days from now
    numberPersonMax: 6,
    cost: 12,
    place: 'Atelier Terre et Créations, Marseille',
    latitude: 43.296482,
    longitude: 5.369780,
    category: 'Travaux manuels',
  },
  {
    title: 'Dégustation de vins artisanaux',
    description: 'Venez découvrir et déguster une sélection de vins artisanaux dans un caveau au cœur du vignoble de Bourgogne',
    startDate: new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000)), // Start date: 1 day from now
    endDate: new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000)), // End date: 1 day from now + 2 hours
    numberPersonMax: 8,
    cost: 15,
    place: 'Caveau du Vignoble, Beaune',
    latitude: 47.025150,
    longitude: 4.840620,
    category: 'Autre',
  }
];
today.setDate(today.getDate() + 1);
activities.push({
  title: 'Une balade artistique dans le quartier',
  description: 'Explorez les rues pittoresques de Paris et découvrez des œuvres d\'art uniques tout en vous imprégnant de l\'atmosphère créative de la ville.',
  startDate: new Date(today.getTime() + 1 * 60 * 60 * 1000), // Start date is 1 hour from now
  endDate: new Date(today.getTime() + (1 * 60 * 60 * 1000) + Math.floor(Math.random() * (48 * 60 * 60 * 1000))), // End date is 1 hour plus a random duration between 1 and 48 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de Rivoli, Paris',
  latitude: 48.856614,
  longitude: 2.352222,
  category: 'Art',
},
{
  title: 'Un match de football improvisé',
  description: 'Rejoignez-nous au parc Marseille pour une partie de football amicale et passionnée. Peu importe votre niveau de jeu, c\'est l\'occasion de s\'amuser et de profiter du grand air.',
  startDate: new Date(today.getTime() + 2 * 60 * 60 * 1000), // Start date is 2 hours from now
  endDate: new Date(today.getTime() + (2 * 60 * 60 * 1000) + Math.floor(Math.random() * (48 * 60 * 60 * 1000))), // End date is 2 hours plus a random duration between 1 and 48 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de la Plage, Marseille',
  latitude: 43.296482,
  longitude: 5.369780,
  category: 'Sport',
},
{
  title: 'Club de lecture : voyage littéraire',
  description: 'Plongez-vous dans les pages d\'un roman captivant lors de notre club de lecture hebdomadaire. Rejoignez-nous au café Bordeaux pour discuter, échanger des idées et partager votre amour pour la littérature.',
  startDate: new Date(today.getTime() + 3 * 60 * 60 * 1000), // Start date is 3 hours from now
  endDate: new Date(today.getTime() + (3 * 60 * 60 * 1000) + Math.floor(Math.random() * (72 * 60 * 60 * 1000))), // End date is 3 hours plus a random duration between 1 and 72 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue du Palais, Bordeaux',
  latitude: 44.837789,
  longitude: -0.579180,
  category: 'Livre',
});
today.setDate(today.getDate() + 1);
activities.push(
  {
    title: 'Soirée cinéma en plein air',
    description: 'Installez-vous confortablement sous les étoiles au parc Lyon et profitez d\'une projection en plein air d\'un film culte. Apportez votre couverture, des en-cas et vos amis pour une soirée cinéma mémorable.',
    startDate: new Date(today.getTime() + 4 * 60 * 60 * 1000), // Start date is 4 hours from now
    endDate: new Date(today.getTime() + (4 * 60 * 60 * 1000) + Math.floor(Math.random() * (96 * 60 * 60 * 1000))), // End date is 4 hours plus a random duration between 1 and 96 hours
    numberPersonMax: 2,
    cost: 5,
    place: 'Rue des Cinéphiles, Lyon',
    latitude: 45.75,
    longitude: 4.85,
    category: 'Cinéma',
  },
  {
    title: 'Après-midi jeux de société',
    description: 'Rejoignez-nous au café Toulouse pour une après-midi remplie de rires, de stratégie et de jeux de société passionnants. Que vous soyez un expert ou un novice, vous êtes le bienvenu pour partager ce moment ludique avec d\'autres amateurs.',
    startDate: new Date(today.getTime() + 5 * 60 * 60 * 1000), // Start date is 5 hours from now
    endDate: new Date(today.getTime() + (5 * 60 * 60 * 1000) + Math.floor(Math.random() * (120 * 60 * 60 * 1000))), // End date is 5 hours plus a random duration between 1 and 120 hours
    numberPersonMax: 2,
    cost: 5,
    place: 'Rue des Joueurs, Toulouse',
    latitude: 43.604652,
    longitude: 1.444209,
    category: 'Jeux de société',
  },
);
today.setDate(today.getDate() + 1);
activities.push({
  title: 'Atelier de création artistique',
  description: 'Laissez libre cours à votre créativité lors de notre atelier d\'art situé au cœur de Nice. Avec l\'aide d\'un artiste expérimenté, vous aurez l\'opportunité d\'explorer différentes techniques et de créer une œuvre d\'art unique à emporter chez vous.',
  startDate: new Date(today.getTime() + 6 * 60 * 60 * 1000), // Start date is 6 hours from now
  endDate: new Date(today.getTime() + (6 * 60 * 60 * 1000) + Math.floor(Math.random() * (144 * 60 * 60 * 1000))), // End date is 6 hours plus a random duration between 1 and 144 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue des Artistes, Nice',
  latitude: 43.710173,
  longitude: 7.261953,
  category: 'Art',
},
{
  title: 'Découverte des bars cachés',
  description: 'Plongez dans l\'ambiance animée de la vie nocturne locale lors de notre visite des bars secrets de Lille. Suivez notre guide passionné qui vous fera découvrir des endroits uniques et des cocktails spéciaux, pour une soirée inoubliable entre amis.',
  startDate: new Date(today.getTime() + 7 * 60 * 60 * 1000), // Start date is 7 hours from now
  endDate: new Date(today.getTime() + (7 * 60 * 60 * 1000) + Math.floor(Math.random() * (168 * 60 * 60 * 1000))), // End date is 7 hours plus a random duration between 1 and 168 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue des Fêtards, Lille',
  latitude: 50.629250,
  longitude: 3.057256,
  category: 'Bar',
},
{
  title: 'Concert acoustique intime',
  description: 'Venez écouter des artistes talentueux dans une ambiance intime lors de notre concert acoustique dans le charmant café Strasbourg. Laissez-vous emporter par les mélodies et profitez d\'une soirée musicale unique en son genre.',
  startDate: new Date(today.getTime() + 8 * 60 * 60 * 1000), // Start date is 8 hours from now
  endDate: new Date(today.getTime() + (8 * 60 * 60 * 1000) + Math.floor(Math.random() * (192 * 60 * 60 * 1000))), // End date is 8 hours plus a random duration between 1 and 192 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de la Musique, Strasbourg',
  latitude: 48.58392,
  longitude: 7.74553,
  category: 'Musique',
});
today.setDate(today.getDate() + 1);
activities.push({
  title: 'Une balade artistique dans le quartier',
  description: 'Explorez les rues pittoresques de Paris et découvrez des œuvres d\'art uniques tout en vous imprégnant de l\'atmosphère créative de la ville.',
  startDate: new Date(today.getTime() + 1 * 60 * 60 * 1000), // Start date is 1 hour from now
  endDate: new Date(today.getTime() + (1 * 60 * 60 * 1000) + Math.floor(Math.random() * (48 * 60 * 60 * 1000))), // End date is 1 hour plus a random duration between 1 and 48 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de Rivoli, Paris',
  latitude: 48.856614,
  longitude: 2.352222,
  category: 'Art',
},
{
  title: 'Un match de football improvisé',
  description: 'Rejoignez-nous au parc Marseille pour une partie de football amicale et passionnée. Peu importe votre niveau de jeu, c\'est l\'occasion de s\'amuser et de profiter du grand air.',
  startDate: new Date(today.getTime() + 2 * 60 * 60 * 1000), // Start date is 2 hours from now
  endDate: new Date(today.getTime() + (2 * 60 * 60 * 1000) + Math.floor(Math.random() * (48 * 60 * 60 * 1000))), // End date is 2 hours plus a random duration between 1 and 48 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de la Plage, Marseille',
  latitude: 43.296482,
  longitude: 5.369780,
  category: 'Sport',
},
{
  title: 'Club de lecture : voyage littéraire',
  description: 'Plongez-vous dans les pages d\'un roman captivant lors de notre club de lecture hebdomadaire. Rejoignez-nous au café Bordeaux pour discuter, échanger des idées et partager votre amour pour la littérature.',
  startDate: new Date(today.getTime() + 3 * 60 * 60 * 1000), // Start date is 3 hours from now
  endDate: new Date(today.getTime() + (3 * 60 * 60 * 1000) + Math.floor(Math.random() * (72 * 60 * 60 * 1000))), // End date is 3 hours plus a random duration between 1 and 72 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue du Palais, Bordeaux',
  latitude: 44.837789,
  longitude: -0.579180,
  category: 'Livre',
});
today.setDate(today.getDate() + 1);
activities.push(
  {
    title: 'Soirée cinéma en plein air',
    description: 'Installez-vous confortablement sous les étoiles au parc Lyon et profitez d\'une projection en plein air d\'un film culte. Apportez votre couverture, des en-cas et vos amis pour une soirée cinéma mémorable.',
    startDate: new Date(today.getTime() + 4 * 60 * 60 * 1000), // Start date is 4 hours from now
    endDate: new Date(today.getTime() + (4 * 60 * 60 * 1000) + Math.floor(Math.random() * (96 * 60 * 60 * 1000))), // End date is 4 hours plus a random duration between 1 and 96 hours
    numberPersonMax: 2,
    cost: 5,
    place: 'Rue des Cinéphiles, Lyon',
    latitude: 45.75,
    longitude: 4.85,
    category: 'Cinéma',
  },
  {
    title: 'Après-midi jeux de société',
    description: 'Rejoignez-nous au café Toulouse pour une après-midi remplie de rires, de stratégie et de jeux de société passionnants. Que vous soyez un expert ou un novice, vous êtes le bienvenu pour partager ce moment ludique avec d\'autres amateurs.',
    startDate: new Date(today.getTime() + 5 * 60 * 60 * 1000), // Start date is 5 hours from now
    endDate: new Date(today.getTime() + (5 * 60 * 60 * 1000) + Math.floor(Math.random() * (120 * 60 * 60 * 1000))), // End date is 5 hours plus a random duration between 1 and 120 hours
    numberPersonMax: 2,
    cost: 5,
    place: 'Rue des Joueurs, Toulouse',
    latitude: 43.604652,
    longitude: 1.444209,
    category: 'Jeux de société',
  },
);
today.setDate(today.getDate() + 1);
activities.push({
  title: 'Atelier de création artistique',
  description: 'Laissez libre cours à votre créativité lors de notre atelier d\'art situé au cœur de Nice. Avec l\'aide d\'un artiste expérimenté, vous aurez l\'opportunité d\'explorer différentes techniques et de créer une œuvre d\'art unique à emporter chez vous.',
  startDate: new Date(today.getTime() + 6 * 60 * 60 * 1000), // Start date is 6 hours from now
  endDate: new Date(today.getTime() + (6 * 60 * 60 * 1000) + Math.floor(Math.random() * (144 * 60 * 60 * 1000))), // End date is 6 hours plus a random duration between 1 and 144 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue des Artistes, Nice',
  latitude: 43.710173,
  longitude: 7.261953,
  category: 'Art',
},
{
  title: 'Découverte des bars cachés',
  description: 'Plongez dans l\'ambiance animée de la vie nocturne locale lors de notre visite des bars secrets de Lille. Suivez notre guide passionné qui vous fera découvrir des endroits uniques et des cocktails spéciaux, pour une soirée inoubliable entre amis.',
  startDate: new Date(today.getTime() + 7 * 60 * 60 * 1000), // Start date is 7 hours from now
  endDate: new Date(today.getTime() + (7 * 60 * 60 * 1000) + Math.floor(Math.random() * (168 * 60 * 60 * 1000))), // End date is 7 hours plus a random duration between 1 and 168 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue des Fêtards, Lille',
  latitude: 50.629250,
  longitude: 3.057256,
  category: 'Bar',
},
{
  title: 'Concert acoustique intime',
  description: 'Venez écouter des artistes talentueux dans une ambiance intime lors de notre concert acoustique dans le charmant café Strasbourg. Laissez-vous emporter par les mélodies et profitez d\'une soirée musicale unique en son genre.',
  startDate: new Date(today.getTime() + 8 * 60 * 60 * 1000), // Start date is 8 hours from now
  endDate: new Date(today.getTime() + (8 * 60 * 60 * 1000) + Math.floor(Math.random() * (192 * 60 * 60 * 1000))), // End date is 8 hours plus a random duration between 1 and 192 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de la Musique, Strasbourg',
  latitude: 48.58392,
  longitude: 7.74553,
  category: 'Musique',
});
today.setDate(today.getDate() + 1);
activities.push({
  title: 'Une balade artistique dans le quartier',
  description: 'Explorez les rues pittoresques de Paris et découvrez des œuvres d\'art uniques tout en vous imprégnant de l\'atmosphère créative de la ville.',
  startDate: new Date(today.getTime() + 1 * 60 * 60 * 1000), // Start date is 1 hour from now
  endDate: new Date(today.getTime() + (1 * 60 * 60 * 1000) + Math.floor(Math.random() * (48 * 60 * 60 * 1000))), // End date is 1 hour plus a random duration between 1 and 48 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de Rivoli, Paris',
  latitude: 48.856614,
  longitude: 2.352222,
  category: 'Art',
},
{
  title: 'Un match de football improvisé',
  description: 'Rejoignez-nous au parc Marseille pour une partie de football amicale et passionnée. Peu importe votre niveau de jeu, c\'est l\'occasion de s\'amuser et de profiter du grand air.',
  startDate: new Date(today.getTime() + 2 * 60 * 60 * 1000), // Start date is 2 hours from now
  endDate: new Date(today.getTime() + (2 * 60 * 60 * 1000) + Math.floor(Math.random() * (48 * 60 * 60 * 1000))), // End date is 2 hours plus a random duration between 1 and 48 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de la Plage, Marseille',
  latitude: 43.296482,
  longitude: 5.369780,
  category: 'Sport',
},
{
  title: 'Club de lecture : voyage littéraire',
  description: 'Plongez-vous dans les pages d\'un roman captivant lors de notre club de lecture hebdomadaire. Rejoignez-nous au café Bordeaux pour discuter, échanger des idées et partager votre amour pour la littérature.',
  startDate: new Date(today.getTime() + 3 * 60 * 60 * 1000), // Start date is 3 hours from now
  endDate: new Date(today.getTime() + (3 * 60 * 60 * 1000) + Math.floor(Math.random() * (72 * 60 * 60 * 1000))), // End date is 3 hours plus a random duration between 1 and 72 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue du Palais, Bordeaux',
  latitude: 44.837789,
  longitude: -0.579180,
  category: 'Livre',
});
today.setDate(today.getDate() + 1);
activities.push(
  {
    title: 'Soirée cinéma en plein air',
    description: 'Installez-vous confortablement sous les étoiles au parc Lyon et profitez d\'une projection en plein air d\'un film culte. Apportez votre couverture, des en-cas et vos amis pour une soirée cinéma mémorable.',
    startDate: new Date(today.getTime() + 4 * 60 * 60 * 1000), // Start date is 4 hours from now
    endDate: new Date(today.getTime() + (4 * 60 * 60 * 1000) + Math.floor(Math.random() * (96 * 60 * 60 * 1000))), // End date is 4 hours plus a random duration between 1 and 96 hours
    numberPersonMax: 2,
    cost: 5,
    place: 'Rue des Cinéphiles, Lyon',
    latitude: 45.75,
    longitude: 4.85,
    category: 'Cinéma',
  },
  {
    title: 'Après-midi jeux de société',
    description: 'Rejoignez-nous au café Toulouse pour une après-midi remplie de rires, de stratégie et de jeux de société passionnants. Que vous soyez un expert ou un novice, vous êtes le bienvenu pour partager ce moment ludique avec d\'autres amateurs.',
    startDate: new Date(today.getTime() + 5 * 60 * 60 * 1000), // Start date is 5 hours from now
    endDate: new Date(today.getTime() + (5 * 60 * 60 * 1000) + Math.floor(Math.random() * (120 * 60 * 60 * 1000))), // End date is 5 hours plus a random duration between 1 and 120 hours
    numberPersonMax: 2,
    cost: 5,
    place: 'Rue des Joueurs, Toulouse',
    latitude: 43.604652,
    longitude: 1.444209,
    category: 'Jeux de société',
  },
);
today.setDate(today.getDate() + 1);
activities.push({
  title: 'Atelier de création artistique',
  description: 'Laissez libre cours à votre créativité lors de notre atelier d\'art situé au cœur de Nice. Avec l\'aide d\'un artiste expérimenté, vous aurez l\'opportunité d\'explorer différentes techniques et de créer une œuvre d\'art unique à emporter chez vous.',
  startDate: new Date(today.getTime() + 6 * 60 * 60 * 1000), // Start date is 6 hours from now
  endDate: new Date(today.getTime() + (6 * 60 * 60 * 1000) + Math.floor(Math.random() * (144 * 60 * 60 * 1000))), // End date is 6 hours plus a random duration between 1 and 144 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue des Artistes, Nice',
  latitude: 43.710173,
  longitude: 7.261953,
  category: 'Art',
},
{
  title: 'Découverte des bars cachés',
  description: 'Plongez dans l\'ambiance animée de la vie nocturne locale lors de notre visite des bars secrets de Lille. Suivez notre guide passionné qui vous fera découvrir des endroits uniques et des cocktails spéciaux, pour une soirée inoubliable entre amis.',
  startDate: new Date(today.getTime() + 7 * 60 * 60 * 1000), // Start date is 7 hours from now
  endDate: new Date(today.getTime() + (7 * 60 * 60 * 1000) + Math.floor(Math.random() * (168 * 60 * 60 * 1000))), // End date is 7 hours plus a random duration between 1 and 168 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue des Fêtards, Lille',
  latitude: 50.629250,
  longitude: 3.057256,
  category: 'Bar',
},
{
  title: 'Concert acoustique intime',
  description: 'Venez écouter des artistes talentueux dans une ambiance intime lors de notre concert acoustique dans le charmant café Strasbourg. Laissez-vous emporter par les mélodies et profitez d\'une soirée musicale unique en son genre.',
  startDate: new Date(today.getTime() + 8 * 60 * 60 * 1000), // Start date is 8 hours from now
  endDate: new Date(today.getTime() + (8 * 60 * 60 * 1000) + Math.floor(Math.random() * (192 * 60 * 60 * 1000))), // End date is 8 hours plus a random duration between 1 and 192 hours
  numberPersonMax: 2,
  cost: 5,
  place: 'Rue de la Musique, Strasbourg',
  latitude: 48.58392,
  longitude: 7.74553,
  category: 'Musique',
});

module.exports = { messages, users, activities };
