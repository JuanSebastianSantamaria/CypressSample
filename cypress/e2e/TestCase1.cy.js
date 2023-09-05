/**
 * My first test case in cypress
 * Tutorial links:
 * https://toolsqa.com/cypress-tutorial/
 * https://docs.cypress.io/guides/end-to-end-testing/testing-your-app
 * https://www.tutorialspoint.com/cypress/cypress_plugins.htm
 */

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('My First Cypress Test Suite', {viewportHeight: 947, viewportWidth: 1920}, () => {

    beforeEach(() => {
        cy.visit("https://demoqa.com/");
    })

    it('Visits the ToolsQA Demo Page and click on a button', () => {
        cy.get(':nth-child(1) > :nth-child(1) > .avatar > svg').click();
        cy.get('#item-4').click();
        cy.get('.mt-4:nth-child(3) button').click();
        cy.get('#dynamicClickMessage').should('be.visible');
        /**
         * Changes the scope in the DOM to do something with multiple elements
         * cy.get('#searchBox').within(() => {
         *      cy.get('input').type('Cucumber') // Only searches inputs within searchBox
         *      cy.get('div').type('Cucumber') // Only searches divs within searchBox
         * })
         * 
         * Changes the scope in the DOM to do something only with 1 element
         * cy.get('.demo-frame > ul > li').find('[href*=keyboard]').should('have.length',2);
         */
    })

    it('Validate that links under the elements section are working', () => {
        cy.xpath('//h5[text()="Elements"]').click();
        cy.get('#item-5').click();
        //List of webelements eq(index)
        cy.get('p a').eq(2).click();
        cy.get('#linkResponse').should('have.text', 'Link has responded with staus 201 and status text Created');
        //Changes the scope in the DOM to do something only with 1 element
        cy.get('#linkWrapper').find('p a').eq(3).click();
        cy.get('#linkResponse').should('have.text', 'Link has responded with staus 204 and status text No Content');
    });
})