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
});
