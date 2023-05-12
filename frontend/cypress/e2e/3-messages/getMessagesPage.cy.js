/// <reference types="cypress" />

const activities = [
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
  {
    id: 2,
    title: 'Une activité 2',
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

const lastMessages = [
  {
    id: 1,
    content: 'Hello',
    createdAt: '2021-04-01T00:00:00.000Z',
    userId: 1,
    activityId: 1,
    user: {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@mail.com',
    },
  },
];

describe("Test de la page des messages de l'utilisateur", () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/users/signin', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          token: '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ',
        },
      });
    });
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
    cy.intercept('GET', '/api/messages/last', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          message: 'Messages retrieved',
          messages: lastMessages,
        },
      });
    });
    cy.visit('http://localhost:19006');
    cy.get('div').contains('Connexion').click();
    cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr');
    cy.get('input').last().type('123456');
    cy.get('div').contains('Se connecter').click();
    cy.get('a[href="/Messages"]').click();
  });
  it('Doit afficher la liste des chats pour chaque activité', () => {
    activities.forEach((activity) => {
      cy.get('div').contains(activity.title).should('be.visible');
    });
    cy.get('div').contains(lastMessages[0].content).should('be.visible');
    cy.get('div')
      .contains(new Date(lastMessages[0].createdAt).toLocaleDateString('fr-FR'))
      .should('be.visible');
    cy.get('div').contains('Encore aucun message envoyé').should('be.visible');
  });
});
