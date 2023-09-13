/**
 * Tutorial links:
 * https://toolsqa.com/cypress-tutorial/
 * https://docs.cypress.io/guides/end-to-end-testing/testing-your-app
 * https://www.tutorialspoint.com/cypress/cypress_plugins.htm
 */

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

//Test cases for the page: https://demoqa.com/

describe('My First Cypress Test Suite', {viewportHeight: 947, viewportWidth: 1920}, () => {

    beforeEach(() => {
        cy.visit("https://demoqa.com/");
    });

    it('Visits the ToolsQA Demo Page and click on a button', () => {
        cy.get(':nth-child(1) > :nth-child(1) > .avatar > svg').click();
        cy.get('#item-4').click();
        cy.get('.mt-4:nth-child(3) button').click();
        cy.get('#dynamicClickMessage').should('be.visible');
    });

    it('Validate that links under the elements section are working', () => {
        cy.xpath('//h5[text()="Elements"]').click();
        cy.get('#item-5').click();
        //List of webelements eq(index)
        cy.get('p a').eq(2).click();
        cy.get('#linkResponse').should('have.text', 'Link has responded with staus 201 and status text Created');
        //Changes the scope in the DOM to do something only with 1 element
        cy.get('#linkWrapper').find('a').eq(3).click();
        cy.get('#linkResponse').should('have.text', 'Link has responded with staus 204 and status text No Content');
        //Changes the scope in the DOM to do something with multiple elements
        cy.get('#linkWrapper').within(() => {
            cy.get('a').eq(4).click();
            cy.get('#linkResponse').should('have.text', 'Link has responded with staus 301 and status text Moved Permanently');
            cy.get('a').eq(5).click();
            cy.get('#linkResponse').should('have.text', 'Link has responded with staus 400 and status text Bad Request');
            cy.get('a').eq(6).click();
            cy.get('#linkResponse').should('have.text', 'Link has responded with staus 401 and status text Unauthorized');
            cy.get('a').eq(7).click();
            cy.get('#linkResponse').should('have.text', 'Link has responded with staus 403 and status text Forbidden');
            cy.get('a').eq(8).click();
            cy.get('#linkResponse').should('have.text', 'Link has responded with staus 404 and status text Not Found');
        });
    });

    it('Check/Uncheck all the elements and validate their status', () => {
        cy.xpath('//h5[text()="Elements"]').click();
        cy.get('#item-1').click();
        //Get parent element and find another webelement from there
        cy.xpath('//span[text()="Home"]').parent().parent().find('button').click();
        cy.xpath('//span[text()="Desktop"]').parent().parent().find('button').click();
        cy.xpath('//span[text()="Documents"]').parent().parent().find('button').click();
        cy.xpath('//span[text()="Downloads"]').parent().parent().find('button').click();
        cy.xpath('//span[text()="WorkSpace"]').parent().parent().find('button').click();
        cy.xpath('//span[text()="Office"]').parent().parent().find('button').click();
        cy.get('#tree-node-home+span').click();
        //For each - syntax in cypress to handle arrays of web elements
        cy.get('.rct-checkbox svg').each(($element) => {
            cy.wrap($element).should('have.class', 'rct-icon-check');
        });
        cy.get('#tree-node-home+span').click();
        cy.get('.rct-checkbox svg').each(($element) => {
            cy.wrap($element).should('have.class', 'rct-icon-uncheck');
        });
    });

    it('Add a new employee to the table of employees', () => {
        cy.xpath('//h5[text()="Elements"]').click();
        cy.get('#item-3').click();
        //Read the fixture file to get the data
        cy.fixture('users.json').then(users => {
            const usersArray = users;
            usersArray.forEach((user) => {
                cy.get('#addNewRecordButton').click();
                //Filling the form
                cy.get('#firstName').type(user.userName);
                cy.get('#lastName').type(user.lastName);
                cy.get('#userEmail').type(user.email);
                cy.get('#age').type(user.age);
                cy.get('#salary').type(user.salary);
                cy.get('#department').type(user.department);
                cy.get('#submit').click();
                //Check the number of pages
                cy.get('.-totalPages').then(($totalPages) => {
                    //Check the current page
                    cy.get('.-pageJump>input').then(($currentPage) => {
                        //Go to the last page
                        for (let i = parseInt($currentPage.val()); i <  parseInt($totalPages.text()); i++) {
                            cy.get('.-next button').click();
                        }
                    });
                });
                //Validate the new user added to the table
                cy.get('.rt-tr-group>div:not(.-padRow)').last().within(() => {
                    cy.get('div').eq(0).should('have.text', user.userName);
                    cy.get('div').eq(1).should('have.text', user.lastName);
                    cy.get('div').eq(2).should('have.text', user.age);
                    cy.get('div').eq(3).should('have.text', user.email);
                    cy.get('div').eq(4).should('have.text', user.salary);
                    cy.get('div').eq(5).should('have.text', user.department);
                });
            });
        });
    });
});