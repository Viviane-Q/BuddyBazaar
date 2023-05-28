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

describe('Test de la page de recherche', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/activities*', (req) => {
      let filteredActivities = activities;
      if (req.query.category) {
        filteredActivities = filteredActivities.filter(
          (activity) => activity.category === req.query.category
        );
      }
      if (req.query.cost) {
        filteredActivities = filteredActivities.filter(
          (activity) => activity.cost <= req.query.cost
        );
      }
      req.reply({
        statusCode: 200,
        body: {
          message: 'Activities retrieved',
          activities: filteredActivities,
        },
      });
    });
    cy.visit('http://localhost:19006');
    cy.get('div').contains('Découvrir').click();
    cy.get('a[href="/SearchScreen"]').click();
  });
  it('Doit afficher toutes les activités par défaut', () => {
    activities.forEach((activity) => {
      cy.get('div').contains(activity.title);
    });
  });
  it('Doit permettre de filter par la barre de recherche sur le titre et la description', () => {
    cy.get('#searchBar').type('ce soir');
    cy.get('div').contains('Une activité ce soir');
    cy.get('div').contains('Une activité ce weekend').should('not.be.visible');
  })
  it('Doit permettre de filter par catégorie', () => {
    cy.get('#displayFilterButton').click();
    cy.get('#categoryInput').select('Cinéma');
    cy.get('div').contains('Une activité ce weekend');
    cy.get('div').contains('Une activité ce soir').should('not.be.visible');
  });
  it('Doit permettre de filter par coût', () => {
    cy.get('#displayFilterButton').click();
    cy.get('#costInput').type('5');
    cy.get('div').contains('Une activité ce soir');
    cy.get('div').contains('Une activité ce weekend').should('not.be.visible');
  });
  it('Doit permettre de filter par catégorie et coût', () => {
    cy.get('#displayFilterButton').click();
    cy.get('#categoryInput').select('Sport');
    cy.get('#costInput').type('5');
    cy.get('div').contains('Une activité ce soir');
    cy.get('div').contains('Une activité ce weekend').should('not.be.visible');
  });
});
