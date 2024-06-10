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
    <td class="product-actions">
     <input type="number" value="${product.quantity}" min="0" class="product-qtd-input" data-product-id="${product.id}">
     <button type="button" class="remove-product-button">
      <ion-icon name="trash-outline"></ion-icon>
      <span>Remover</span>
    </button>
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
    // Encontre o campo de entrada associado ao produto
    let input = document.querySelector(`.product-qtd-input[data-product-id="${product.id}"]`);
    
    // Atualize a quantidade do produto com o valor do campo de entrada
    product.quantity = parseInt(input.value);

    // Converte o preço de string para número
    let price = parseFloat(product.price.replace("R$", "").replace(",", "."));
    
    // Calcula o total para este produto e adiciona ao total geral
    total += price * product.quantity;
  });

  // Atualiza o total do carrinho com o valor calculado
  cart.totalAmount = total.toFixed(2).replace(".", ",");
  
  // Atualiza o texto do total no HTML
  document.querySelector(".cart-total-container span").innerText = "R$" + cart.totalAmount;
  
  console.log(cart.totalAmount);
}

// Adiciona evento de escuta a cada campo de entrada
document.querySelectorAll('.product-qtd-input').forEach(input => {
  input.addEventListener('input', updateTotal);
});
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);
