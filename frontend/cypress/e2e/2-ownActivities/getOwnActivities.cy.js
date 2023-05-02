/// <reference types="cypress" />


describe('Test de la page d\'inscription', () => {
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
                        activities:
                            [{"id":1,"title":"Une activité","description":"Une description","startDate":"2024-01-01T00:00:00.000Z","endDate":"2024-01-02T00:00:00.000Z","numberPersonMax":5,"cost":10,"place":"Grenoble","category":"Sport","userId":1}],
                    }
                })
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
})
