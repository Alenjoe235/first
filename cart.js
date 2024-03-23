document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const addProductButton = document.getElementById('add-product');
  const clearButton = document.getElementById('clear');
  const finishButton = document.getElementById('finish');
  const resetButton = document.getElementById('reset');

  let products = [];

  const addProductToList = () => {
      const productName = prompt('Enter product name:');
      if (productName) {
          const productPrice = parseFloat(prompt('Enter product price:'));
          if (!isNaN(productPrice)) {
              const product = { name: productName, price: productPrice };
              products.push(product);
              const listItem = document.createElement('li');
              listItem.textContent = `${product.name} - $${product.price}`;
              productList.appendChild(listItem);
          } else {
              alert('Invalid price. Please enter a valid number.');
          }
      }
  };

  addProductButton.addEventListener('click', addProductToList);

  clearButton.addEventListener('click', () => {
      products = [];
      localStorage.removeItem('products');
      productList.innerHTML = '';
  });

  resetButton.addEventListener('click', () => {
      localStorage.clear();
      products = [];
      productList.innerHTML = '';
      cartItems.innerHTML = '';
  });

  finishButton.addEventListener('click', () => {
      localStorage.setItem('products', JSON.stringify(products));
      addProductButton.disabled = true;
      clearButton.disabled = true;
      finishButton.disabled = true;
  });

  const addToCart = (product) => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
  };

  const updateCart = () => {
      cartItems.innerHTML = '';
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.textContent = `${item.name} - $${item.price}`;
          cartItems.appendChild(cartItem);
      });
  };

  updateCart();
});
