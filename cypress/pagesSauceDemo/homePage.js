class loginPage{
    elements = {
        sortDropdown : () => cy.get('select[data-test="product_sort_container"]'),
        productTitle : () => cy.get('.inventory_item_name'),
        productPrice : () => cy.get('.inventory_item_price')
    }
}

module.exports = new loginPage();