class buttonsPage{
    elements = {
        clickMeButton : () => cy.get('.mt-4:nth-child(3) button'),
        dynamicMessage : () => cy.get('#dynamicClickMessage')
    }
}

module.exports = new buttonsPage();