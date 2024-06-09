if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
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
    console.log('cartProducts', cartProducts)
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
  console.log('cart', cart)
  
    total = total.toFixed(2).replace(".", ",");
    cart.totalAmount = total;
    document.querySelector(".cart-total-container span").innerText = "R$" + cart.totalAmount;
  }
  