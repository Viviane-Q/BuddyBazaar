/// <reference types="cypress" />

const activities = [{ "id": 1, "title": "Une activité", "description": "Une description", "startDate": "2024-01-01T00:00:00.000Z", "endDate": "2024-01-02T00:00:00.000Z", "numberPersonMax": 5, "cost": 10, "place": "Grenoble", "category": "Sport", "userId": 1 }];

describe('Test de la page des activités de l\'utilisateur', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/activities/by-user', (req) => {
            const token = req.headers.token;
            if (token !== '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ')
                req.reply({
                    statusCode: 401,
                    body: {
                        message: 'Unauthorized'
                    }
                })
            else
                req.reply({
                    statusCode: 200,
                    body: {
                        message: "Activities retrieved",
                        activities
                    }
                })
        })
        cy.intercept('POST', '/api/activities', (req) => {
            const token = req.headers.token;
            if (token !== '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ')
                req.reply({
                    statusCode: 401,
                    body: {
                        message: 'Unauthorized'
                    }
                })
            else {
                const activity = req.body;
                activity.id = activities.length + 1;
                activities.push({ ...activity, userId: 1 });
                req.reply({
                    statusCode: 200,
                    body: {
                        message: "Activity created",
                    }
                })
            }
        })
        cy.intercept('POST', '/api/users/signin', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    token: '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ'
                }
            })
        })
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
                body: { "type": "FeatureCollection", "version": "draft", "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [4.835, 45.758] }, "properties": { "label": "Lyon", "score": 0.963941818181818, "id": "69123", "type": "municipality", "name": "Lyon", "postcode": "69001", "citycode": "69123", "x": 842627.75, "y": 6519256.98, "population": 522228, "city": "Lyon", "context": "69, Rhône, Auvergne-Rhône-Alpes", "importance": 0.60336, "municipality": "Lyon" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [1.90357, 43.04293] }, "properties": { "label": "Lyon 09500 Saint-Quentin-la-Tour", "score": 0.9355990909090908, "id": "09274_3tp8vj", "name": "Lyon", "postcode": "09500", "citycode": "09274", "x": 610585.32, "y": 6216577.88, "city": "Saint-Quentin-la-Tour", "context": "09, Ariège, Occitanie", "type": "street", "importance": 0.29159, "street": "Lyon" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [1.53869, 43.403589] }, "properties": { "label": "Lyons 31560 Saint-Léon", "score": 0.848940909090909, "id": "31495_y1rdbu", "name": "Lyons", "postcode": "31560", "citycode": "31495", "x": 581574.03, "y": 6257147.97, "city": "Saint-Léon", "context": "31, Haute-Garonne, Occitanie", "type": "street", "importance": 0.33835, "street": "Lyons" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-0.364374, 44.568035] }, "properties": { "label": "Lyonne 33210 Pujols-sur-Ciron", "score": 0.8470945454545454, "id": "33343_os02c6", "name": "Lyonne", "postcode": "33210", "citycode": "33343", "x": 432925.98, "y": 6391130.01, "city": "Pujols-sur-Ciron", "context": "33, Gironde, Nouvelle-Aquitaine", "type": "street", "importance": 0.31804, "street": "Lyonne" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [3.060065, 50.618539] }, "properties": { "label": "Rue de Lyon 59000 Lille", "score": 0.7078027272727272, "id": "59350_5753", "name": "Rue de Lyon", "postcode": "59000", "citycode": "59350", "oldcitycode": "59350", "x": 704258.02, "y": 7057948.8, "city": "Lille", "oldcity": "Lille", "context": "59, Nord, Hauts-de-France", "type": "street", "importance": 0.78583, "street": "Rue de Lyon" } }], "attribution": "BAN", "licence": "ETALAB-2.0", "query": "Lyon", "limit": 5 }
            })
        });
        cy.visit('http://localhost:19006')
        cy.get('div').contains('Connexion').click()
        cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr')
        cy.get('input').last().type('123456')
        cy.get('div').contains('Se connecter').click()
        // get button where it says Mes activités
        cy.get('a[href="/MyActivities"]').click();
    })
    it('Doit afficher au moins une activité sur la page des propres activités', () => {
        cy.get('div').contains('Une activit\u00E9').should('be.visible')
    })
    it('Doit afficher le formulaire de création d\'activité quand on clique sur le bouton', () => {
        cy.get("#newActivityButton").click()
        cy.get('div').contains('Cr\u00E9er une activit\u00E9').should('be.visible')
    })
    it('Doit afficher un message d\'erreur quand le titre n\'est pas renseigné', () => {
        cy.get("#newActivityButton").click()
        cy.get('div').contains('Cr\u00E9er une activit\u00E9').should('be.visible')
        cy.get('div').contains('Valider').click()
        cy.get('div').contains('Tous les champs doivent être remplis').should('be.visible')
    })
    it('Doit rajouter une activité quand on remplit le formulaire et qu\'on clique sur le bouton', () => {
        cy.get("#newActivityButton").click()
        cy.get('div').contains('Cr\u00E9er une activit\u00E9').should('be.visible')
        cy.get('#titleInput').eq(0).type('Une nouvelle activité')
        cy.get('#descriptionInput').type('Une nouvelle description')
        cy.get('#placeInput').type('Grenoble')
        cy.get('#placeInput-menu > div').eq(0).click()
        cy.get('#validateButtonNewActivity').click()
        cy.get('[data-testid="card-container"]').filter(':visible').should('have.length', 2)
    })
})
