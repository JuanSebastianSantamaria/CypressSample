# Cypress first project
This is a project to learn cypress and automate some sample test cases.

## How to run the project in a local environment using the UI
1. Install nodejs from [here](https://nodejs.org/en/download/package-manager) and cypress from here [here](https://docs.cypress.io/guides/getting-started/installing-cypress)
2. Go to the project and run the following command:

    ```bash
    npm run cyopen
    ```
3. In the UI, select the browser and the test case(s) that you want to run.

## How to run the project in a local environment in headless mode
1. Install nodejs from [here](https://nodejs.org/en/download/package-manager) and cypress from here [here](https://docs.cypress.io/guides/getting-started/installing-cypress)
2. Go to the project and run the following command:

    ```bash
    npm run cyrun
    ```
3. To execute an specific test, run the following command, where "cypress/e2e/tests/sauceDemo.cy.js" is the relative path of the test that you want to run:

    ```bash
    npm run cyrun -- --spec cypress/e2e/tests/sauceDemo.cy.js
    ```
4. To execute in a specific browser, run the following command, where "chrome" is the name of the browser where you want to run:

    ```bash
    npm run cyrun -- --spec cypress/e2e/tests/sauceDemo.cy.js -b chrome
    ```

## How to run the project using docker
1. Run the following command, where "cypress-demo:1.0.0" is the name of the docker image:

    ```bash
    docker build -t cypress-demo:1.0.0 .
    ```
2. Run the following command, where "cypress-demo:1.0.0" is the name of the docker image:

    ```bash
    docker run -it cypress-demo:1.0.0 -b chrome
    ```
    The "-it" will allow you to create an interactive terminal to add some arguments in the command, like the browser or a specific test.
3. To execute an specific test, run the following command, where "cypress/e2e/tests/sauceDemo.cy.js" is the relative path of the test that you want to run:

    ```bash
    docker run -it cypress-demo:1.0.0 --spec ./cypress/e2e/tests/sauceDemo.cy.js -b chrome
    ```