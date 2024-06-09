var cart = {
  totalAmount: "0,00",
  products: []
};

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartTable();
    updateTotal();
  }
}

function updateCartTable() {
  const tableBody = document.querySelector(".cart-table tbody");
  tableBody.innerHTML = "";

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

    tableBody.append(newCartProduct);

    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct);
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
  });
}

function removeProduct(event) {
  const button = event.target;
  const productRow = button.parentElement.parentElement;
  const productName = productRow.getElementsByClassName("cart-product-title")[0].innerText;

  cart.products = cart.products.filter(product => product.name !== productName);
  productRow.remove();
  updateTotal();
  saveCartToLocalStorage();
}

function checkIfInputIsNull(event) {
  const input = event.target;
  if (input.value === "0") {
    input.parentElement.parentElement.remove();
  }
  updateTotal();
  saveCartToLocalStorage();
}

function updateTotal() {
  let total = 0;
  cart.products.forEach(product => {
    total += parseFloat(product.price.replace("R$", "").replace(",", ".")) * product.quantity;
  });
  cart.totalAmount = total.toFixed(2).replace(".", ",");
  document.querySelector(".cart-total-container span").innerText = "R$" + cart.totalAmount;
}

document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);
