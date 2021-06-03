describe('Smoke Tests', () => {
  it('Landing page opens', () => {
    cy.visit('/');
  });

  // it('Add alternative page opens', () => {
  //   cy.visit('/');
  //   cy.get('.nav-item').contains('Add alternative').click();
  //   cy.url().should('contain', '/add');
  // });

  it('Logo redirects to landing page', () => {
    cy.get('#brand-logo').click();
    cy.url().should('contain', '/');
  });

  it('Incorrect password repeat reloads page', () => {
    cy.visit('/signup');
    cy.get('#user-name').type('Stefi');
    cy.get('#user-email').type('stefi@testing.com');
    cy.get('#user-password').type('test123');
    cy.get('#user-password-repeat').type('test12');
    cy.get('button').contains('Sign up').click();
    cy.url().should('contain', '/signup');
  });
});
