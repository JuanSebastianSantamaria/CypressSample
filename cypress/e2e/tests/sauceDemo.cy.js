//Test cases for the page: https://www.saucedemo.com/

import homePage from "../../pagesSauceDemo/homePage";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

describe('Validate that the user should be able to sort the products', {viewportHeight: 947, viewportWidth: 1920}, () => {
    beforeEach(() => {
        cy.fixture('sauceDemoUser.json').as('user');
        // Sauce demo doesn't fire load event, so these tests should be run in headless mode in order to pass
        // Command: npm run cyrun -- --spec cypress/e2e/tests/sauceDemo.cy.js
        cy.visit("https://www.saucedemo.com/");
        cy.get('@user').then((user) => {
            cy.login(user.username, user.password);
        });
    });

    it('sort products from Z to A', () => {
        let productsList = new Array();
        homePage.elements.sortDropdown().select('za');
        homePage.elements.productTitle()
            .each(($element) => {
                productsList.push($element.text())
            })
            .then(() => {
                cy.wrap(productsList).should('deep.equal', [...productsList].sort().reverse())
            });
    });
});