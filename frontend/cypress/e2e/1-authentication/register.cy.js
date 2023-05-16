/// <reference types="cypress" />


describe('Test de la page d\'inscription', () => {
    beforeEach(() => {
        cy.intercept('POST', '/api/users/register', (req) => {
            if (req.body.email !== 'Sebastien.Viardot@grenoble-inp.fr') {
                req.reply({
                    statusCode: 200,
                    body: {
                        message: 'User created'
                    }
                })
            } else {
                req.reply({
                    statusCode: 400,
                    body: {
                        message: 'Email already exists'
                    }
                })
            }
        })
        cy.visit('http://localhost:19006')
        // get button where it says S\'inscrire
        cy.get('div').contains('Inscription').click()
    })
    it('Doit afficher un message d\'erreur quand le nom n\'est pas renseigné', () => {
        cy.get('#registerEmailInput').type('Sebastien.Viardot@grenoble-inp.fr')
        cy.get('#registerPasswordInput').type('123456')
        cy.get('#registerButton').click()
        // check a snackbar containing the error message is displayed
        cy.get('div').contains('Tous les champs doivent être remplis').should('be.visible')
    })
    it('Doit afficher un message d\'erreur quand l\'email n\'est pas renseigné', () => {
        cy.get('#registerNameInput').first().type('Sebastien Viardot')
        cy.get('#registerPasswordInput').last().type('123456')
        cy.get('#registerButton').contains('S\'inscrire').click()
        // check a snackbar containing the error message is displayed
        cy.get('div').contains('Tous les champs doivent être remplis').should('be.visible')
    })
    it('Doit afficher un message d\'erreur quand le mot de passe n\'est pas renseigné', () => {
        cy.get('#registerNameInput').type('Sebastien Viardot')
        cy.get('#registerEmailInput').type('Sebastien.Viardot@grenoble-inp.fr')
        cy.get('#registerButton').contains('S\'inscrire').click()
        // check a snackbar containing the error message is displayed
        cy.get('div').contains('Tous les champs doivent être remplis').should('be.visible')
    })

    it('Doit afficher un message d\'erreur quand le mot de passe n\'est pas assez complexe', () => {
        cy.get('#registerNameInput').type('Sebastien Viardot')
        cy.get('#registerEmailInput').type('Sebastien.Viardot@grenoble-inp.fr')
        cy.get('#registerPasswordInput').type('123456')
        cy.get('#registerButton').click()
        // check a snackbar containing the error message is displayed
        cy.get('div').contains('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial').should('be.visible')
    })
    it('Doit afficher un message d\'erreur quand l\'adresse email est déjà utilisée', () => {
        cy.get('#registerNameInput').type('Sebastien Viardot')
        cy.get('#registerEmailInput').type('Sebastien.Viardot@grenoble-inp.fr')
        cy.get('#registerPasswordInput').type('123456aB!')
        cy.get('#registerButton').click()
        // check a snackbar containing the error message is displayed
        cy.get('div').contains('L\'adresse email est déjà utilisée').should('be.visible')
    })

    it('Doit afficher un message de succès lorsque toutes les règles sont respectées', () => {
        cy.get('#registerNameInput').type('Sebastien Viardot')
        cy.get('#registerEmailInput').type('Sebastien.Viardot@gmail.com')
        cy.get('#registerPasswordInput').type('123456aB!')
        cy.get('#registerButton').click()
        // check a snackbar containing the success message is displayed
        cy.get('div').contains('Vous êtes inscrit, vous pouvez maintenant vous connecter').should('be.visible')
    })
})