describe('Edit profile page', () => {

  it('shows label and input in one line when viewport is greater than 576px', () => {
    cy.viewport(1280, 800);
    cy.visit('/user/60af9bdd5e252e00040c5d3e/edit');
    cy.get('#edit-profile-form').should('be.visible');
    cy.get('#edit-username').should('be.visible');
    cy.get('#edit-email').should('be.visible');
    cy.get('#edit-password').should('be.visible');
    cy.matchImageSnapshot('edit-profile-large-screen');
  });

  it('shows label and input in two line when viewport is smaller than 576px', () => {
    cy.viewport(375, 812);
    cy.visit('/user/60af9bdd5e252e00040c5d3e/edit');
    cy.get('#edit-profile-form').should('be.visible');
    cy.get('#edit-username').should('be.visible');
    cy.get('#edit-email').should('be.visible');
    cy.get('#edit-password').should('be.visible');
    cy.matchImageSnapshot('edit-profile-small-screen');
  });
});
