describe('Login Test', () => {

  // Array to store inputted credentials and error messages
  const loginAttempts = [];

  // VALID LOGIN CREDENTIALS
  // Create a new Map
  const userCredentials = new Map();

  // Add valid username and password pairs
  userCredentials.set('standard_user', 'secret_sauce');
  // userCredentials.set('locked_out_user', 'secret_sauce');
  userCredentials.set('problem_user', 'secret_sauce');
  // userCredentials.set('performance_glitch_user', 'secret_sauce');
  userCredentials.set('error_user', 'secret_sauce');
  userCredentials.set('visual_user', 'secret_sauce');

  // Loop through each user in the map and perform login tests
  userCredentials.forEach((password, username) => {
    it(`should successfully login as ${username}`, () => {
      // Visit the login page
      cy.visit('/');

      // Enter username and password
      cy.get('#user-name').type(username);
      cy.get('#password').type(password);

      // Click the login button
      cy.get('#login-button').click();

      // Store inputted credentials in the array
      loginAttempts.push({
        username,
        password,
        errorMessage: '', // Leave error message blank for successful attempt
        success: true // Mark as successful attempt
      });

      // Assertions to verify successful login
      cy.url().should('include', '/inventory.html');
    });
  });

  // INVALID LOGIN CREDENTIALS

  // Create a new Map
  const invalidCredentials = new Map();

  // Add invalid username and password pairs
  invalidCredentials.set('standard_userssssss', 'secret_sauce');
  invalidCredentials.set('locked_out_user', 'secret_sauceeeeeeeeeee');
  invalidCredentials.set('problem_userrrrrrrr', 'secret_sauceyyyyyyyyyy');

  // Loop through each user in the map and perform login tests
  invalidCredentials.forEach((password, username) => {
    it(`should fail login as ${username}`, () => {
      // Visit the login page
      cy.visit('/');

      // Enter username and password
      cy.get('#user-name').type(username);
      cy.get('#password').type(password);

      // Click the login button
      cy.get('#login-button').click();

      // Capture the error message
      cy.get('.error-message-container').invoke('text').then(errorMessage => {
        // Store inputted credentials and error message in the array
        loginAttempts.push({
          username,
          password,
          errorMessage: errorMessage.trim(),
          success: false // Mark as unsuccessful attempt
        });

        // Add assertions to verify the login failed
        cy.url().should('eq', `${Cypress.config('baseUrl')}`);
        cy.get('.error-message-container').should('be.visible');
        // Optionally, you can assert specific parts of the error message
        expect(errorMessage.trim()).to.contain('Username and password');
      });
    });
  });
  after(() => {
    // Print to Cypress console
    cy.log('Login attempts:');
    cy.log(loginAttempts);

    // Alternatively, you can use regular JavaScript console.log for Cypress
    console.log('Login attempts:');
    console.log(loginAttempts);
  });
});