// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export {}
declare global {
    namespace Cypress {
        interface Chainable {
            getByData(selector: string): Chainable<JQuery<HTMLElement>>,
            getByRole(selector: string): Chainable<JQuery<HTMLElement>>,
            getByType(selector: string): Chainable<JQuery<HTMLElement>>,
            getByClassSubstring(selector: string): Chainable<JQuery<HTMLElement>>,
        }
    }
}

Cypress.Commands.add('getByData', (selector) => { 
    return cy.get(`[data-testid=${selector}]`)})

Cypress.Commands.add('getByRole', (selector) => { 
    return cy.get(`[role=${selector}]`)})

Cypress.Commands.add('getByType', (selector) => { 
    return cy.get(`[type=${selector}]`)})

Cypress.Commands.add('getByClassSubstring', (selector) => { 
    return cy.get(`[class*=${selector}]`)})

    


    

