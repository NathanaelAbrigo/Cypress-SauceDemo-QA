const itemDataset = [
  {
    name: 'Sauce Labs Backpack',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    price: '$29.99'
  },
  {
    name: 'Sauce Labs Bike Light',
    description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
    price: '$9.99'
  },
  {
    name: 'Sauce Labs Bolt T-Shirt',
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    price: '$15.99'
  },
  {
    name: 'Sauce Labs Fleece Jacket',
    description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
    price: '$49.99'
  },
  {
    name: 'Test.allTheThings() T-Shirt (Red)',
    description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    price: '$15.99'
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

    let i = 0;
    while(itemDataset.length > i)
    {
      let selectProduct = "[data-test=\"item-"+i+"-title-link\"] > [data-test=\"inventory-item-name\"]";

      cy.get(selectProduct).click();
      cy.url().should('include', '.html?id='+i);

      let productName = cy.get('[data-test="inventory-item-name"]').invoke('text');
      let productDescription = cy.get('[data-test="inventory-item-desc"]').invoke('text');
      let productPrice = cy.get('[data-test="inventory-item-price"]').invoke('text');

      productName.then((name) => {
        productDescription.then((description) => {
          productPrice.then((price) => {
            for (let j = 0; j < itemDataset.length; j++) {
              if (itemDataset[j].name === name.trim()) {
                expect(itemDataset[j].description).to.eq(description.trim());
                expect(itemDataset[j].price).to.eq(price.trim());
                break;
              }
            }
          });
        });
      });

      cy.get('[data-test="back-to-products"]').click();

      //ensure you are back in inventory page
      cy.url().should('include', '/inventory.html');
      i++
    }

  
});
});
