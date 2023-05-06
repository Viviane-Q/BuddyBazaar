/// <reference types="cypress" />

const activities = [{"id":1,"title":"Une activité","description":"Une description","startDate":"2024-01-01T00:00:00.000Z","endDate":"2024-01-02T00:00:00.000Z","numberPersonMax":5,"cost":10,"place":"Grenoble","category":"Sport","userId":1}];

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
                        message:"Activities retrieved",
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
            else{
                const activity = req.body;
                activity.id = activities.length + 1;
                activities.push(activity);
                req.reply({
                    statusCode: 200,
                    body: {
                        message:"Activity created",
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
        cy.visit('http://localhost:19006')
        cy.get('div').contains('Connexion').click()
        cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr')
        cy.get('input').last().type('123456')
        cy.get('div').contains('Se connecter').click()
        // get button where it says Mes activités
        cy.get('[data-testid="bottom-navigation-bar-content-wrapper"] > div:nth-child(3)').click()
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
        cy.get('#datePickerButton').click()
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        cy.get(`[data-testid="react-native-paper-dates-day-${year}-${month}-${day}"]`).click()
        cy.get(`[data-testid="react-native-paper-dates-day-${year}-${month}-${day}"]`).click()
        cy.get('[data-testid="react-native-paper-dates-save-text"]').click()
        cy.get('#descriptionInput').type('Une nouvelle description')
        cy.get('#placeInput').type('Grenoble')
        cy.get('#validateButtonNewActivity').click()
        cy.get('[data-testid="card-container"]').filter(':visible').should('have.length', 2)
    })
})
