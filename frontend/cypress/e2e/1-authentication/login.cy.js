/// <reference types="cypress" />


describe('Test de la page de connexion', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/users/signin', (req) => {
      if (req.body.email === 'Sebastien.Viardot@grenoble-inp.fr' && req.body.password === '123456') {
        req.reply({
          statusCode: 200,
          body: {
            token: '7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQ'
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
    cy.visit('http://localhost:19006')
    // get button where it says Se connecter
    cy.get('div').contains('Connexion').click()
  })
  it('Doit afficher un message d\'erreur quand le mot de passe n\'est pas renseigné', () => {
    cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr')
    cy.get('div').contains('Se connecter').click()
    // check a snackbar containing the error message is displayed
    cy.get('div').contains('Tous les champs doivent être remplis').should('be.visible')
  })

  it('Doit afficher un message d\'erreur quand l\' email n\'est pas renseigné', () => {
    cy.get('input').last().type('123456')
    cy.get('div').contains('Se connecter').click()
    // check a snackbar containing the error message is displayed
    cy.get('div').contains('Tous les champs doivent être remplis').should('be.visible')
  })

  it('Doit afficher un message d\'erreur quand les logins sont incorrects', () => {
    cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr')
    cy.get('input').last().type('mauvaisMotDePasse')
    cy.get('div').contains('Se connecter').click()
    // check a snackbar containing the error message is displayed
    cy.get('div').contains('L\'adresse email ou le mot de passe est incorrect').should('be.visible')
  })

  it('Doit rediriger l\'utilisateur vers le menu après une connexion réussie', () => {
    cy.get('input').first().type('Sebastien.Viardot@grenoble-inp.fr')
    cy.get('input').last().type('123456')
    cy.get('div').contains('Se connecter').click()
    // check the user is redirected to the menu
    cy.get('div').contains('Chat').should('be.visible')
  })
})