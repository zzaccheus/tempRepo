// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-file-upload';

// Login with email and password command for BeforeEach
Cypress.Commands.add('login', (user) => {
    cy.get('input[name=email]').type(user.email);
    cy.get('input[name=password]').type(user.password);
})

// Logout command for AfterEach
Cypress.Commands.add('logout', () => {
    cy.contains('Logout').click();
})

