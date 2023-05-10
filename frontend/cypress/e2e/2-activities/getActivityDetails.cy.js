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
      cy.visit('http://localhost:19006');
      cy.get('div').contains('Connexion').click();
      cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr');
      cy.get('input').last().type('123456');
      cy.get('div').contains('Se connecter').click();
      // get button where it says Mes activités
      cy.get(
        '[data-testid="bottom-navigation-bar-content-wrapper"] > div:nth-child(3)'
      ).click();
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

  describe("En tant que non connecté et non détenteur de l'actiivité", () => {
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

  describe("En tant que connecté et non détenteur de l'actiivité", () => {
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
