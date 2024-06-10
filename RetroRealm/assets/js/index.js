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
  if (!button) {
    console.error("Erro: Botão não encontrado");
    return;
  }

  const showcaseBanner = button.closest('.showcase-banner');
  const productInfos = showcaseBanner ? showcaseBanner.parentElement : button.parentElement.parentElement;

  // Verifica se showcase-img existe, senão usa product-img default
  const productImageElement = productInfos.querySelector(".showcase-img") || productInfos.querySelector(".product-img.default");
  const productImage = productImageElement ? productImageElement.src : '';

  const productNameElement = productInfos.querySelector(".showcase-title");
  const productName = productNameElement ? productNameElement.innerText : 'Nome não disponível';

  const productPriceElement = productInfos.querySelector(".price");
  const productPrice = productPriceElement ? productPriceElement.innerText : 'Preço não disponível';

  console.log('Product Image:', productImage);
  console.log('Product Name:', productName);
  console.log('Product Price:', productPrice);
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
  const addToCartButtons1 = document.getElementsByClassName("btn-action");
  console.log('btn-action buttons:', addToCartButtons1);
  for (let i = 0; i < addToCartButtons1.length; i++) {
    addToCartButtons1[i].addEventListener("click", addProductToCart);
  }

  const addToCartButtons2 = document.getElementsByClassName("add-cart-btn");
  console.log('add-cart-btn buttons:', addToCartButtons2);
  for (let i = 0; i < addToCartButtons2.length; i++) {
    addToCartButtons2[i].addEventListener("click", addProductToCart);
  }
}

// Configure the event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', ready);