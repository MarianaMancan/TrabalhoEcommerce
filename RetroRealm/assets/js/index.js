var cart = {
  totalAmount: "0,00",
  products: []
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addProductToCart(event) {
  const button = event.target.closest('button');
  const productInfos = button.parentElement.parentElement;
  const productImage = productInfos.getElementsByClassName("showcase-img")[0].src;
  const productName = productInfos.getElementsByClassName("showcase-title")[0].innerText;
  const productPrice = productInfos.getElementsByClassName("price")[0].innerText;

  const existingProduct = cart.products.find(product => product.name === productName);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({
      image: productImage,
      name: productName,
      price: productPrice,
      quantity: 1
    });
  }

  updateTotal();
  saveCartToLocalStorage();

  // Exibir alerta de sucesso
  alert("Produto adicionado ao carrinho com sucesso");
}

function updateTotal() {
  let total = 0;
  cart.products.forEach(product => {
    total += parseFloat(product.price.replace("R$", "").replace(",", ".")) * product.quantity;
  });
  cart.totalAmount = total.toFixed(2).replace(".", ",");
}

function ready() {
  const addToCartButtons = document.getElementsByClass("btn-action");
  console.log('btn-action buttons:', addToCartButtons);
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  const addToCartButtons2 = document.getElementsByClassName("add-cart-btn");
  console.log('add-cart-btn buttons:', addToCartButtons2);
  for (let i = 0; i < addToCartButtons2.length; i++) {
    addToCartButtons2[i].addEventListener("click", addProductToCart);
  }
}

// Configure the event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', ready);