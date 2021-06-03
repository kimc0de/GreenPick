describe('Authentication Tests', () => {

  /*before(() => {
    cy.visit('/signup');
    cy.get('#user-name').type('Anastasia');
    cy.get('#user-email').type('anastasia@testing.com');
    cy.get('#user-password').type('1234');
    cy.get('#user-password-repeat').type('1234');
    cy.get('button').contains('Sign up').click();
  })*/

  it('Login page opens', () => {
    cy.visit('/');
    cy.get('.nav-item').contains('Log In').click();
    cy.url().should('contain', '/login');
  });

  it('Login with incorrect credentials', () => {
    cy.visit('/login');
    cy.get('#user-name').type('Anastasia');
    cy.get('#user-password').type('5678');
    cy.get('button').contains('Log in').click();
    cy.url().should('contain', '/login');
  });

  it('Login with correct credentials', () => {
    cy.visit('/login');
    cy.get('#user-name').type('Anastasia');
    cy.get('#user-password').type('1234');
    cy.get('button').contains('Log in').click();
    cy.url().should('contain', '/');
  });
});
