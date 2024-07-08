const itemDataset = [
  {
    itemname: 'Sauce Labs Backpack',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    price: '29.99'
  },
  {
    itemname: 'Sauce Labs Bike Light',
    description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
    price: '9.99'
  },
  {
    itemname: 'Sauce Labs Bolt T-Shirt',
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    price: '15.99'
  },
  {
    itemname: 'Sauce Labs Fleece Jacket',
    description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
    price: '49.99'
  },
  {
    itemname: 'Test.allTheThings() T-Shirt (Red)',
    description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    price: '15.99'
  },
];

describe('Product Page', () => {
  // Before running tests in this file, perform login
  before(() => {
    // Assuming 'standard_user' and 'secret_sauce' are valid credentials
    cy.login('standard_user', 'secret_sauce');
  });

  // Now write your product page tests
  it('should display products correctly', () => {
    // Ensure you are on the product page after login
    cy.url().should('include', '/inventory.html');

    // Add more tests related to the product page functionality
  });
/*
  it('should do something else on the product page', () => {
    // Another example product page test
    // Ensure you are on the product page after login
    cy.url().should('include', '/inventory.html');

    // Add more tests related to the product page functionality
  });

  // Optionally, you can also include logout or cleanup steps
  after(() => {
    // Example: logout if necessary
    // cy.get('#logout-button').click();
  });
  */
});
