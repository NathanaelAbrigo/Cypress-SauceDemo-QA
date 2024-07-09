const totalProducts = 6;
const removeProductIDinCart = [0, 3]; //Sauce Labs Bike Lights //Test.allTheThings() T-Shirt (Red)

let orders = [];

describe('cartFunctions', () => {

  before(() => {
    // Assuming 'standard_user' and 'secret_sauce' are valid credentials
    cy.login('standard_user', 'secret_sauce');
  });

  it('can add/remove to cart', () => {

    //add to cart one of each product
    for (let i = 0; totalProducts > i; i++) {
      let selectProduct = "[data-test=\"item-" + i + "-title-link\"] > [data-test=\"inventory-item-name\"]";

      cy.get(selectProduct).click();
      cy.url().should('include', '.html?id=' + i);

      cy.get('[data-test="add-to-cart"]').click();

      cy.get('[data-test="inventory-item-name"]').invoke('text').then((productName) => {
        cy.get('[data-test="inventory-item-desc"]').invoke('text').then((productDescription) => {
          cy.get('[data-test="inventory-item-price"]').invoke('text').then((productPrice) => {
            orders.push({
              productName: String(productName).trim(),
              productDescription: String(productDescription).trim(),
              productPrice: String(productPrice).trim()
            });
          });
        });
      });

      cy.get('[data-test="back-to-products"]').click();
      cy.url().should('include', '/inventory.html');
    };
    console.log('add cart')
    console.log(orders)



    // Assuming orders array is initialized and populated elsewhere in your code...
    console.log('remove order');
    for (let i = 0; i < totalProducts; i++) {
      for (let j = 0; removeProductIDinCart.length > j; j++) {
        // console.log('i = ' + i + ' j=' + j)
        if (i === j) {
          let selectProduct = `[data-test="item-${i}-title-link"] > [data-test="inventory-item-name"]`;

          // Click on the product
          cy.get(selectProduct).click();

          // Verify URL contains product id
          cy.url().should('include', `.html?id=${i}`);

          // Click on remove button
          cy.get('[data-test="remove"]').click();

          // Capture product name and trim whitespace
          cy.get('[data-test="inventory-item-name"]').invoke('text').then((productName) => {
            productName = String(productName).trim();

            // Example: Remove item from orders array
            for (let j = 0; j < orders.length; j++) {
              if (orders[j].productName.includes(productName)) {
                orders.splice(j, 1); // Remove the item from orders array
                break; // Exit loop after removal
              }
            }

            // Log updated orders array
            console.log('Updated Orders:', orders);

            // Navigate back to products page
            cy.get('[data-test="back-to-products"]').click();
            cy.url().should('include', '/inventory.html');
          });
        }
      }

    }
  });

});