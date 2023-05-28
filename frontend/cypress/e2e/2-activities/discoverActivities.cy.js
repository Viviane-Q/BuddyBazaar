/// <reference types="cypress" />

const activities = [
  {
    id: 1,
    title: 'Une activité ce soir',
    description: 'Une description',
    startDate: '2024-01-01T20:00:00.000Z',
    endDate: '2024-01-01T22:00:00.000Z',
    numberPersonMax: 5,
    cost: 5,
    place: 'Grenoble',
    latitude: 45.757814,
    longitude: 4.835293,
    category: 'Sport',
    userId: 1,
    participants: [],
  },
  {
    id: 2,
    title: 'Une activité ce weekend',
    description: 'Une description',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-01-02T00:00:00.000Z',
    numberPersonMax: 4,
    cost: 10,
    place: 'Grenoble',
    latitude: 45.757814,
    longitude: 4.835293,
    category: 'Cinéma',
    userId: 1,
    participants: [],
  },
];

describe('Test de la page de découverte', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/activities*', (req) => {
      if (req.query.category === 'Sport') {
        req.reply({
          statusCode: 200,
          body: {
            message: 'Activities retrieved',
            activities: [activities[0]],
          },
        });
      } else if (new Date(req.query.startDate).getHours() === 18) {
        // activities tonight
        req.reply({
          statusCode: 200,
          body: {
            message: 'Activities retrieved',
            activities: [activities[0]],
          },
        });
      } else if (new Date(req.query.startDate).getHours() === 0) {
        // activities this weekend
        req.reply({
          statusCode: 200,
          body: {
            message: 'Activities retrieved',
            activities: [activities[1]],
          },
        });
      }
    });
    cy.visit('http://localhost:19006');
    cy.get('div').contains('Découvrir').click();
  });
  it('Doit afficher au moins une activité pour ce soir sur la page de découverte', () => {
    cy.get('div').contains('Une activit\u00E9 ce soir').should('be.visible');
  });
  it('Doit afficher au moins une activité pour ce weekend sur la page de découverte', () => {
    // the activity is not visible because it is not in the viewport
    // we need to scroll to it
    cy.get('div').contains('Une activit\u00E9 ce weekend').scrollIntoView();
    cy.get('div').contains('Une activit\u00E9 ce weekend').should('be.visible');
  });
  it('Doit rediriger vers la page de recherche affichant les activités correspondant au bouton catégorie sélectionnée', () => {
    cy.get('div').contains('Sport').click();
    cy.get('div').contains('Recherche').should('be.visible');
    cy.get('div').filter(':visible').contains('Une activit\u00E9 ce soir').should('have.length', 1);
  });
});
