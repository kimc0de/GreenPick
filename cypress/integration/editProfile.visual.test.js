describe('Edit profile page', () => {
  before(() => {
    //cy.visit('/user/60af9bdd5e252e00040c5d3e/edit'); //this is real user on our mongo atlas database
    cy.visit('localhost:3000/user/60aad19ca4a7f6434225c7d5/edit');
  });

  it('shows label and input in one line when viewport is greater than 576px', () => {
    cy.viewport('macbook-13');
    cy.get('#edit-profile-form').should('be.visible');
    cy.get('#edit-username').should('be.visible');
    cy.get('#edit-email').should('be.visible');
    cy.get('#edit-password').should('be.visible');
    cy.matchImageSnapshot('edit-profile-large-screen');
  });

  it('shows label and input in two line when viewport is smaller than 576px', () => {
    cy.viewport('iphone-x');
    cy.get('#edit-profile-form').should('be.visible');
    cy.get('#edit-username').should('be.visible');
    cy.get('#edit-email').should('be.visible');
    cy.get('#edit-password').should('be.visible');
    cy.matchImageSnapshot('edit-profile-small-screen');
  });
});
