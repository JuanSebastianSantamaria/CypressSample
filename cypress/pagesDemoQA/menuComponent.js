class menuComponent{
    elements = {
        elementsCard : () => cy.xpath('//h5[text()="Elements"]'),
        buttonsMenuOption : () => cy.get('#item-4')
    }
}

module.exports = new menuComponent();