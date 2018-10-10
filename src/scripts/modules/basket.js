/**
 * @desc This component contains all functionality for the basket
 * public function addItemToBasket
 * @author Kaj Dillen
 * @required none
 */
var Basket = (function(my) {
  let totalItems = 0; //total amount of items in basket

  my.init = function() {
    _linkButtons();
  };

  my.addItemToBasket = function() {
    totalItems++;
    console.log('added an item');
    const counters = document.getElementsByClassName('js-basket-counter');
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
    const addToBasketButtons = document.getElementsByClassName('js-add-to-basket');
    Array.prototype.forEach.call(addToBasketButtons, function(counter, i) {
      addToBasketButtons[i].addEventListener('click', function() {
        _isItemAvailable();
      }, false);
    });
  }

  function _isItemAvailable() {
    const available = true;
    //check if item is available trough API. if yes, increase counters
    if (available) {
      my.addItemToBasket();
    }
  }

  return my;
}(Basket || {}));

/**
 * @desc private function to increase counter of items, build on class instead of ID so component is reusable for different design aspects
 * @param none
 * @return none
 */
