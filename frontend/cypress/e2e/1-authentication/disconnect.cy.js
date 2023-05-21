/// <reference types="cypress" />


describe('Test de la redirection en cas de déconnexion', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/users/me', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    user: {
                        id: 1,
                        name: 'Jean Dupont',
                        email: '',
                    },
                },
            });
        });
        cy.intercept('POST', '/api/users/signin', (req) => {
            if (req.body.email === 'Sebastien.Viardot@grenoble-inp.fr' && req.body.password === '123456') {
                req.reply({
                    statusCode: 200,
                    body: {
                        token: '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tabcd'
                    }
                })
            } else {
                req.reply({
                    statusCode: 400,
                    body: {
                        message: 'Email or password is incorrect'
                    }
                })
            }
        })
        cy.intercept('GET', '/api/activities/*', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    message: "Activity retrieved",
                    activities: []
                }
            })
        });

        cy.visit('http://localhost:19006')
        cy.get('div').contains('Connexion').click()
        cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr')
        cy.get('input').last().type('123456')
        cy.get('div').contains('Se connecter').click()
        cy.get('a[href="/UserProfileScreen"]').click()
    })
    it('Doit rediriger vers la page d\'acceuil', () => {
        cy.get('div').contains('Se déconnecter').click()
        cy.get('div').contains('Connexion').should('be.visible')
    })
})