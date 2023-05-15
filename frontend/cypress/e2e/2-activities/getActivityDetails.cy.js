let activities = [];

describe("Test de la page de détails d'une activité", () => {
  beforeEach(() => {
    activities = [
      {
        id: 1,
        title: 'Une activité',
        description: 'Une description',
        startDate: '2024-01-01T00:00:00.000Z',
        endDate: '2024-01-02T00:00:00.000Z',
        numberPersonMax: 5,
        cost: 10,
        place: 'Grenoble',
        category: 'Sport',
        userId: 1,
        participants: [],
      },
    ];
  });
  describe("En tant que détenteur de l'activité", () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/activities/by-user', (req) => {
        const token = req.headers.token;
        if (token !== '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ')
          req.reply({
            statusCode: 401,
            body: {
              message: 'Unauthorized',
            },
          });
        else
          req.reply({
            statusCode: 200,
            body: {
              message: 'Activities retrieved',
              activities,
            },
          });
      });
      cy.intercept('POST', '/api/users/signin', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            token: '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ',
          },
        });
      });
      cy.intercept('PUT', '/api/activities/*', (req) => {
        const token = req.headers.token;
        if (token !== '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ')
          req.reply({
            statusCode: 401,
            body: {
              message: 'Unauthorized',
            },
          });
        else {
          const id = req.url.split('/').pop();
          const oldActivity = activities.find((a) => a.id === parseInt(id));
          const newActivity = req.body;
          activities[activities.indexOf(oldActivity)] = {
            ...oldActivity,
            ...newActivity,
          };
          req.reply({
            statusCode: 200,
            body: {
              message: 'Activity updated',
            },
          });
        }
      });
      cy.intercept('DELETE', '/api/activities/*', (req) => {
        const token = req.headers.token;
        if (token !== '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ')
          req.reply({
            statusCode: 401,
            body: {
              message: 'Unauthorized',
            },
          });
        else {
          const id = req.url.split('/').pop();
          const oldActivity = activities.find((a) => a.id === parseInt(id));
          activities.splice(activities.indexOf(oldActivity), 1);
          req.reply({
            statusCode: 200,
            body: {
              message: 'Activity deleted',
            },
          });
        }
      });
      cy.intercept('GET', '/api/users/me', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            user: {
              id: 1,
              name: 'Jean Dupont',
              email: 'Sebastien.Viardot@grenoble-inp.fr',
            },
          },
        });
      });
      cy.intercept('GET', '/search/*', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            type: 'FeatureCollection',
            version: 'draft',
            features: [
              {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [4.835, 45.758] },
                properties: {
                  label: 'Lyon',
                  score: 0.963941818181818,
                  id: '69123',
                  type: 'municipality',
                  name: 'Lyon',
                  postcode: '69001',
                  citycode: '69123',
                  x: 842627.75,
                  y: 6519256.98,
                  population: 522228,
                  city: 'Lyon',
                  context: '69, Rhône, Auvergne-Rhône-Alpes',
                  importance: 0.60336,
                  municipality: 'Lyon',
                },
              },
              {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [1.90357, 43.04293] },
                properties: {
                  label: 'Lyon 09500 Saint-Quentin-la-Tour',
                  score: 0.9355990909090908,
                  id: '09274_3tp8vj',
                  name: 'Lyon',
                  postcode: '09500',
                  citycode: '09274',
                  x: 610585.32,
                  y: 6216577.88,
                  city: 'Saint-Quentin-la-Tour',
                  context: '09, Ariège, Occitanie',
                  type: 'street',
                  importance: 0.29159,
                  street: 'Lyon',
                },
              },
              {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [1.53869, 43.403589] },
                properties: {
                  label: 'Lyons 31560 Saint-Léon',
                  score: 0.848940909090909,
                  id: '31495_y1rdbu',
                  name: 'Lyons',
                  postcode: '31560',
                  citycode: '31495',
                  x: 581574.03,
                  y: 6257147.97,
                  city: 'Saint-Léon',
                  context: '31, Haute-Garonne, Occitanie',
                  type: 'street',
                  importance: 0.33835,
                  street: 'Lyons',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-0.364374, 44.568035],
                },
                properties: {
                  label: 'Lyonne 33210 Pujols-sur-Ciron',
                  score: 0.8470945454545454,
                  id: '33343_os02c6',
                  name: 'Lyonne',
                  postcode: '33210',
                  citycode: '33343',
                  x: 432925.98,
                  y: 6391130.01,
                  city: 'Pujols-sur-Ciron',
                  context: '33, Gironde, Nouvelle-Aquitaine',
                  type: 'street',
                  importance: 0.31804,
                  street: 'Lyonne',
                },
              },
              {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [3.060065, 50.618539] },
                properties: {
                  label: 'Rue de Lyon 59000 Lille',
                  score: 0.7078027272727272,
                  id: '59350_5753',
                  name: 'Rue de Lyon',
                  postcode: '59000',
                  citycode: '59350',
                  oldcitycode: '59350',
                  x: 704258.02,
                  y: 7057948.8,
                  city: 'Lille',
                  oldcity: 'Lille',
                  context: '59, Nord, Hauts-de-France',
                  type: 'street',
                  importance: 0.78583,
                  street: 'Rue de Lyon',
                },
              },
            ],
            attribution: 'BAN',
            licence: 'ETALAB-2.0',
            query: 'Lyon',
            limit: 5,
          },
        });
      });
      cy.visit('http://localhost:19006');
      cy.get('div').contains('Connexion').click();
      cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr');
      cy.get('input').last().type('123456');
      cy.get('div').contains('Se connecter').click();
      // get button where it says Mes activités
      cy.get('a[href="/MyActivitiesScreen"]').click();
    });
    it("Doit afficher les détails d'une activité avec les boutons de suppression et de modification", () => {
      cy.get('div').contains('Une activité').click();
      cy.get('div').contains('Une description');
      cy.get('div').contains('01/01/2024');
      cy.get('div').contains('02/01/2024');
      cy.get('div').contains('5');
      cy.get('div').contains('10');
      cy.get('div').contains('Grenoble');
      cy.get('div').contains('Sport');
      cy.get('#editActivityButton').should('exist');
      cy.get('#deleteActivityButton').should('exist');
      cy.get('#registerActivityButton').should('not.be.visible');
      cy.get('#unregisterActivityButton').should('not.exist');
    });
    it("Doit permettre de modifier l'activité", () => {
      cy.get('div').contains('Une activité').click();
      cy.get('#editActivityButton').click();
      // modification de l'activité
      cy.get('div').contains('Modifier une activité');
      cy.get('#placeInput').clear();
      cy.get('#placeInput').type('Lyon');
      cy.get('#placeInput-menu > div').eq(0).click();
      cy.get('#validateButtonNewActivity').click();
      cy.get('div').contains('Lyon');
    });
    it("Doit permettre de supprimer l'activité", () => {
      cy.get('div').contains('Une activité').click();
      cy.get('#deleteActivityButton').click();
      // suppression de l'activité
      cy.get('div').contains('Mes activités');
      cy.get('div').contains('Une activité').should('not.exist');
    });
  });

  describe("En tant que non connecté et non détenteur de l'activité", () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/activities*', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            message: 'Activities retrieved',
            activities: [activities[0]],
          },
        });
      });
      cy.visit('http://localhost:19006');
      cy.get('div').contains('Découvrir').click();
    });
    it("Doit afficher les détails d'une activité sans les boutons de suppressionn, de modification et d'inscription", () => {
      cy.get('div').contains('Une activité').click();
      cy.get('div').contains('Une description');
      cy.get('div').contains('01/01/2024');
      cy.get('div').contains('02/01/2024');
      cy.get('div').contains('5');
      cy.get('div').contains('10');
      cy.get('div').contains('Grenoble');
      cy.get('div').contains('Sport');
      cy.get('#editActivityButton').should('not.exist');
      cy.get('#deleteActivityButton').should('not.exist');
      cy.get('#registerActivityButton').should('not.be.visible');
      cy.get('#unregisterActivityButton').should('not.exist');
    });
  });

  describe("En tant que connecté et non détenteur de l'activité", () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/activities/by-user', (req) => {
        const token = req.headers.token;
        console.log(token);
        if (token !== '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ')
          req.reply({
            statusCode: 401,
            body: {
              message: 'Unauthorized',
            },
          });
        else
          req.reply({
            statusCode: 200,
            body: {
              message: 'Activities retrieved',
              activities,
            },
          });
      });
      cy.intercept('GET', '/api/activities*', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            message: 'Activities retrieved',
            activities: [activities[0]],
          },
        });
      });
      cy.intercept('POST', '/api/users/signin', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            token: '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ',
          },
        });
      });
      cy.intercept('GET', '/api/users/me', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            user: {
              id: 2,
              name: 'John Doe',
              email: 'john.doe@mail.com',
            },
          },
        });
      });
      cy.intercept('POST', '/api/activities/*/register', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            message: 'Registration successful',
          },
        });
      });
      cy.intercept('POST', '/api/activities/*/unregister', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            message: 'De-registration successful',
          },
        });
      });
      cy.visit('http://localhost:19006');
      cy.get('div').contains('Connexion').click();
      cy.get('input').first().type('john.doe@mail.com');
      cy.get('input').last().type('123456');
      cy.get('div').contains('Se connecter').click();
    });
    it("Doit afficher les détails d'une activité sans les boutons de suppression et de modification et avec le bouton d'inscription", () => {
      cy.get('div').contains('Une activité').click();
      cy.get('div').contains('Une description');
      cy.get('div').contains('01/01/2024');
      cy.get('div').contains('02/01/2024');
      cy.get('div').contains('5');
      cy.get('div').contains('10');
      cy.get('div').contains('Grenoble');
      cy.get('div').contains('Sport');
      cy.get('#editActivityButton').should('not.exist');
      cy.get('#deleteActivityButton').should('not.exist');
      cy.get('#registerActivityButton').scrollIntoView();
      cy.get('#registerActivityButton').should('be.visible');
      cy.get('#unregisterActivityButton').should('not.exist');
    });
    it("Doit permettre de s'inscrire et se désinscrire à une activité", () => {
      // inscription
      cy.get('div').contains('Une activité').click();
      cy.get('#registerActivityButton').click();
      cy.get('#registerActivityButton').should('not.exist');
      cy.get('#unregisterActivityButton').should('be.visible');
      cy.get('div').contains('1/5');

      // désinscription
      cy.get('#unregisterActivityButton').click();
      cy.get('#registerActivityButton').should('be.visible');
      cy.get('#unregisterActivityButton').should('not.exist');
      cy.get('div').contains('0/5');
    });
  });
});
