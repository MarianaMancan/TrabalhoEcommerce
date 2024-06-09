var cart = {
  totalAmount: "0,00",
  products: []
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  loadCartFromLocalStorage();

  // Botão remover produto
  const removeCartProductButtons = document.getElementsByClassName("remove-product-button");
  for (var i = 0; i < removeCartProductButtons.length; i++) {
    removeCartProductButtons[i].addEventListener("click", removeProduct);
  }

  // Mudança valor dos inputs
  const quantityInputs = document.getElementsByClassName("product-qtd-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull);
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("btn-action");
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  const addToCartButtons2 = document.getElementsByClassName("add-cart-btn");
  for (var i = 0; i < addToCartButtons2.length; i++) {
    addToCartButtons2[i].addEventListener("click", addProductToCart);
  }

  // Botão comprar
  const purchaseButton = document.getElementsByClassName("purchase-button")[0];
  purchaseButton.addEventListener("click", makePurchase);
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove();
  updateTotal();
  saveCartToLocalStorage();
}

function checkIfInputIsNull(event) {
  if (event.target.value === "0") {
    event.target.parentElement.parentElement.remove();
  }
  updateTotal();
  saveCartToLocalStorage();
}

function addProductToCart(event) {
  const button = event.target;
  const productInfos = button.parentElement.parentElement;
  const productImage = productInfos.getElementsByClassName("showcase-img")[0].src;
  const productName = productInfos.getElementsByClassName("showcase-title")[0].innerText;
  const productPrice = productInfos.getElementsByClassName("price")[0].innerText;

  const productsCartNames = document.getElementsByClassName("cart-product-title");
  for (var i = 0; i < productsCartNames.length; i++) {
    if (productsCartNames[i].innerText === productName) {
      productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++;
      updateTotal();
      saveCartToLocalStorage();
      return;
    }
  }

  let newCartProduct = document.createElement("tr");
  newCartProduct.classList.add("cart-product");

  newCartProduct.innerHTML = `
    <td class="product-identification">
      <img src="${productImage}" alt="${productName}" class="cart-product-image">
      <strong class="cart-product-title">${productName}</strong>
    </td>
    <td>
      <span class="cart-product-price">${productPrice}</span>
    </td>
    <td>
      <input type="number" value="1" min="0" class="product-qtd-input">
      <button type="button" class="remove-product-button">Remover</button>
    </td>
  `;

  const tableBody = document.querySelector(".cart-table tbody");
  tableBody.append(newCartProduct);
  updateTotal();
  saveCartToLocalStorage();

  newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct);
  newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
}

function makePurchase() {
  if (cart.totalAmount === "0,00") {
    alert("Seu carrinho está vazio!");
  } else {
    alert(`
      Obrigado pela sua compra!
      Valor do pedido: R$${cart.totalAmount}\n
      Volte sempre :)
    `);

    document.querySelector(".cart-table tbody").innerHTML = "";
    updateTotal();
    localStorage.removeItem('cart');
  }
}

function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product");
  let total = 0;

  cart.products = [];

  for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = parseFloat(cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", "."));
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;

    total += productPrice * productQuantity;

    cart.products.push({
      image: cartProducts[i].getElementsByClassName("cart-product-image")[0].src,
      name: cartProducts[i].getElementsByClassName("cart-product-title")[0].innerText,
      price: cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText,
      quantity: productQuantity
    });
  }

  total = total.toFixed(2).replace(".", ",");
  cart.totalAmount = total;
  document.querySelector(".cart-total-container span").innerText = "R$" + cart.totalAmount;
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    cart.products.forEach(product => {
      let newCartProduct = document.createElement("tr");
      newCartProduct.classList.add("cart-product");

      newCartProduct.innerHTML = `
        <td class="product-identification">
          <img src="${product.image}" alt="${product.name}" class="cart-product-image">
          <strong class="cart-product-title">${product.name}</strong>
        </td>
        <td>
          <span class="cart-product-price">${product.price}</span>
        </td>
        <td>
          <input type="number" value="${product.quantity}" min="0" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
      `;

      const tableBody = document.querySelector(".cart-table tbody");
      tableBody.append(newCartProduct);

      newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct);
      newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
    });

    document.querySelector(".cart-total-container span").innerText = "R$" + cart.totalAmount;
  }
}
