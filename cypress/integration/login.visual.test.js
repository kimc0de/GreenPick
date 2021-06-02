describe('Log in', () => {

  it('shows log in page with full navigation items with view width from 1200px', () => {
    cy.viewport(1280, 800);
    cy.visit('/login');
    cy.matchImageSnapshot('login large screen');
  });

  it('shows log in page with burger menu icon with view width smaller than 1200px', () => {
    cy.viewport('iphone-x');
    cy.visit('/login');
    cy.matchImageSnapshot('login small screen');
  });

});
