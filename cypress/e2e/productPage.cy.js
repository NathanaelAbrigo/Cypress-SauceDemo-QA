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
    name: 'Sauce Labs Onesie',
    description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
    price: '$7.99'
  },
  {
    name: 'Test.allTheThings() T-Shirt (Red)',
    description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    price: '$15.99'
  },
];

describe('Product Page', () => {
  // Before running tests in this file, perform login
  beforeEach(() => {
    // Assuming 'standard_user' and 'secret_sauce' are valid credentials
    cy.login('standard_user', 'secret_sauce');
  });

  // Now write your product page tests
  it('should display products\' information correctly', () => {
    // Ensure you are on the product page after login
    cy.url().should('include', '/inventory.html');

    let i = 0;
    while (itemDataset.length > i) {
      let selectProduct = "[data-test=\"item-" + i + "-title-link\"] > [data-test=\"inventory-item-name\"]";

      cy.get(selectProduct).click();
      cy.url().should('include', '.html?id=' + i);

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

  // });
  it('should display in Name (A-Z)', () => {
    
    // Define the selector for the dropdown
    const dropdownSelector = 'select[data-test="product-sort-container"]';
    cy.get(dropdownSelector).select('az');
    cy.get(dropdownSelector).should('have.value', 'az');

    // Define the selector for the product names
    const selectProduct = '[data-test="inventory-item-name"]';

    // Create an array to store the product names
    const productNames = [];

    // Fetch all product names
    cy.get(selectProduct).each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        productNames.push(text.trim());
      });
    }).then(() => {
      // Create a copy of productNames array and sort it alphabetically
      const sortedProductNames = [...productNames].sort();

      // Compare the sorted names with the names on the page
      for (let i = 0; i < productNames.length; i++) {
        expect(productNames[i]).to.eq(sortedProductNames[i]);
      }
    });
  });

  it('should display in Name (Z-A)', () => {

    // Define the selector for the dropdown
    const dropdownSelector = 'select[data-test="product-sort-container"]';
    cy.get(dropdownSelector).select('za');
    cy.get(dropdownSelector).should('have.value', 'za');

    // Define the selector for the product names
    const selectProduct = '[data-test="inventory-item-name"]';

    // Create an array to store the product names
    const productNames = [];

    // Fetch all product names
    cy.get(selectProduct).each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        productNames.push(text.trim());
      });
    }).then(() => {
      // Create a copy of productNames array and sort it in reverse alphabetical order
      const sortedProductNames = [...productNames].sort().reverse();

      // Compare the sorted names with the names on the page
      for (let i = 0; i < productNames.length; i++) {
        expect(productNames[i]).to.eq(sortedProductNames[i]);
      }
    });
  });

  it('should display in Price (High-Low)', () => {
    
    // Define the selector for the dropdown
    const dropdownSelector = 'select[data-test="product-sort-container"]';
    cy.get(dropdownSelector).select('hilo');
    cy.get(dropdownSelector).should('have.value', 'hilo');

    // Define the selector for the product prices
    const selectProductPrice = '[data-test="inventory-item-price"]';

    // Create an array to store the product prices
    const productPrices = [];

    // Fetch all product prices
    cy.get(selectProductPrice).each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        // Remove the dollar sign and convert to number
        const price = parseFloat(text.replace('$', '').trim());
        productPrices.push(price);
      });
    }).then(() => {
      // Create a copy of productPrices array and sort it in descending order
      const sortedProductPrices = [...productPrices].sort((a, b) => b - a);

      // Compare the sorted prices with the prices on the page
      for (let i = 0; i < productPrices.length; i++) {
        expect(productPrices[i]).to.eq(sortedProductPrices[i]);
      }
    });
  });

  it('should display in Price (Low-High)', () => {
    // Define the selector for the dropdown
    const dropdownSelector = 'select[data-test="product-sort-container"]';
    cy.get(dropdownSelector).select('lohi');
    cy.get(dropdownSelector).should('have.value', 'lohi');
  
    // Define the selector for the product prices
    const selectProductPrice = '[data-test="inventory-item-price"]';
  
    // Create an array to store the product prices
    const productPrices = [];
  
    // Fetch all product prices
    cy.get(selectProductPrice).each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        // Remove the dollar sign and convert to number
        const price = parseFloat(text.replace('$', '').trim());
        productPrices.push(price);
      });
    }).then(() => {
      // Create a copy of productPrices array and sort it in ascending order
      const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
  
      // Compare the sorted prices with the prices on the page
      for (let i = 0; i < productPrices.length; i++) {
        expect(productPrices[i]).to.eq(sortedProductPrices[i]);
      }
    });
  });
  

});
