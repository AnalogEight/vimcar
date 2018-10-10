/**
 * @desc This component contains all functionality for the Cart
 * public function addItemToCart
 * @author Kaj Dillen
 * @required none
 */
var Cart = (function(my) {
  let totalItems = 0; //total amount of items in Cart

  my.init = function() {
    _linkButtons();
  };

  my.addItemToCart = function() {
    totalItems++;

    const counters = document.getElementsByClassName('js-cart-counter');
    Array.prototype.forEach.call(counters, function(counter, i) {
      counter.innerText = totalItems;
    });

    UIkit.notification({
      message: 'Item added to cart!',
      status: 'success',
      pos: 'top-center',
      timeout: 30000
    });
  };

  function _linkButtons() {
    const addToCartButtons = document.getElementsByClassName('js-add-to-cart');
    Array.prototype.forEach.call(addToCartButtons, function(counter, i) {
      addToCartButtons[i].addEventListener('click', function() {
        _isItemAvailable();
      }, false);
    });
  }

  function _isItemAvailable() {
    const available = true;

    if (available) {
      my.addItemToCart();
    }
  }

  return my;
}(Cart || {}));

/**
 * @desc private function to increase counter of items, build on class instead of ID so component is reusable for different design aspects
 * @param none
 * @return none
 */
