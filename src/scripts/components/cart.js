/**
 * @desc This component contains all functionality for the Cart
 * @author Kaj Dillen
 * @required Alert.js
 */
var Cart = (function(my) {
  let totalItems = 0; //total amount of items in Cart

  my.init = function() {
    _linkButtons(); //link the functionality to the "js-add-to-cart" buttons
  };

  /**
   * @desc function to link functionality to .js-add-to-cart buttons
   * @param none
   * @return none
   */
  function _linkButtons() {
    const addToCartButtons = document.getElementsByClassName('js-add-to-cart');
    Array.prototype.forEach.call(addToCartButtons, function(counter, i) {
      addToCartButtons[i].addEventListener('click', function() {
        _isItemAvailable(); //check if selected item is available
      }, false);
    });
  }

  /**
   * @desc function see if item is available and display the correct alert
   * @param none
   * @return none
   */
  function _isItemAvailable() {
    fetch("https://example.com/-/v1/stock/reserve", {
        'method': 'POST'
      }) //use the mock API call to check for availibility
      .then(function(response) {
        const status = response.status;
        let message,
          type;
        switch (status) {
          case 204:
            message = "Item added to cart";
            type = "success";
            _addItemToCart(); //increase counter and add to cart
            break;
          case 418:
            message = "Item out of stock";
            type = "danger";
            break;
          case 500:
            message = "Something went wrong. Please try again later";
            type = "warning";
            break;
        }

        Alert.new('top', false, type, message); //create a new alert, non-sticky with the right status and message
      });
  }

  /**
   * @desc function to add items to cart
   * @param none
   * @return none
   */
  function _addItemToCart() {
    totalItems++; //increase total items by 1

    const counters = document.getElementsByClassName('js-cart-counter'); //loop trough all counters to update the number
    Array.prototype.forEach.call(counters, function(counter, i) {
      counter.innerText = totalItems;
    });
  };

  return my;

}(Cart || {}));
