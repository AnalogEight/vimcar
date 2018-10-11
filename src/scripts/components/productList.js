var Productlist = (function(my) {
  const productlist = document.getElementsByClassName('js-productlist')[0];
  my.init = function() {
    _loadProducts(products.watches); //products is a mock json list of watches, defined in api/products.js. Normally this would come from backend with REST-API
  };

  function _loadProducts(products) {
    Object.keys(products).forEach(function(key) {
      const product = products[key];
      _addProduct(product);
    });
  }

  function _addProduct(product) {
    const producthtml =
      `<div class="col-xs-6 col-xs-6 col-md-3 product-tile">
        <div class="card">
          <img class="image" srcset="assets/images/products/${product.Image}@2x.png 2x" src="assets/images/products/${product.Image}.png" alt="${product.Name}"></img>
          <div class="card--hover">
            <button class="js-add-to-cart btn-add">Add to Cart</button>
          </div>
        </div>
        <h2 class="title">${product.Name}</h2>
      </div>`;
    productlist.innerHTML += producthtml;
  }

  return my;
}(Productlist || {}));
