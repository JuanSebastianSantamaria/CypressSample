class loginPage{
    elements = {
        usernameField : () => cy.get('input[data-test="username"]'),
        passwordField : () => cy.get('input[data-test="password"]'),
        loginButton : () => cy.get('input[data-test="login-button"]')
    }
}

module.exports = new loginPage();