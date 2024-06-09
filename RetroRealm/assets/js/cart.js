var cart = {
  totalAmount: "0,00",
  products: []
};


function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
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





