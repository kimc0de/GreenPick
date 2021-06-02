describe('Sign up', () => {

//   it('shows sign up page with full navigation items with view width from 1200px', () => {
//     cy.viewport(1280, 800);
//     cy.visit('/signup');
//     cy.matchImageSnapshot('signup large screen');
//   });

  it('shows signup page with burger menu icon with view width smaller than 1200px', () => {
    cy.viewport('iphone-x');
    cy.visit('/signup');
    cy.matchImageSnapshot('signup small screen');
  });

});
