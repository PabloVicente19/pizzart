const cardsContainer = document.querySelector(".cards-products");
const cardsRecomendedContainer = document.querySelector(".cards-container");
const cartContainer = document.querySelector(".cart-products-list");
const cartContent = document.querySelector(".cart-container");
const cartIcon = document.querySelector(".cart-shopping-container");
const cartPriceTotal = document.querySelector(".cart-summary-totalValue");
const cartPriceSubTotal = document.querySelector(".cart-summary-sub");
const products = [...pizzas];
let cart = JSON.parse(localStorage.getItem("products")) || [];

const createCard = (product) => {
  const { id, name, description, price, image } = product;
  return `
    <div class="card-product">
            <img
              src="${image}"
              alt="${name}"
              class="card-product-img"
            />
            <h2 class="card-product-title">${name}</h2>
            <h3 class="card-product-subTitle">${description}</h3>
            <span class="card-product-price">$ ${price}</span>
            <button class="card-product-btn" data-id=${id}>Agregar</button>
          </div>
    `;
};
const renderCards = (container, arr, fn) => {
  return (container.innerHTML = arr.map(fn).join(""));
};
const createCardRecomended = (product) => {
  const { id, name, description, price, image } = product;
  return `<div class="card">
  <img
    src="${image}"
    alt="${name}"
    class="card-img"
  />
  <h3 class="card-title">${name}</h3>
  <h4 class="card-subTitle">${description}</h4>
  <span class="card-price">$ ${price}</span>
  <button class="card-btn" data-id=${id}>agregar</button>
</div>`;
};
const renderCardsRecomended = () => {
  const ids = getRandomNumbers();
  const productsFiltered = pizzas.filter((obj) => ids.includes(obj.id));
  cardsRecomendedContainer.innerHTML = productsFiltered
    .map(createCardRecomended)
    .join("");
};
const createCartOfCart = (product) => {
  const { id, name, description, price, image, quantity, total } = product;
  return `<div class="product">
  <img
    class="product-img"
    src="${image}"
    alt="${name}"
    />
    <span class="product-title">${name}</span>
  <span class="product-description">${description}</span>
  <span class="product-price">${total}</span>
  <div class="product-cant">
  <button class="btn-remove" data-id=${id}>-</button>
  <span class="cant">${quantity}</span>
    <button class="btn-add" data-id=${id}>+</button>
    </div>
    </div>`;
};
const addProductInCart = (e) => {
  let id = e.target.dataset.id;
  if (!id) return;

  let productFiltered = products.find((product) => product.id == id);
  let sameProduct = cart.find((prod) => prod.id == productFiltered.id);
  if (!sameProduct) {
    cart.push({ ...productFiltered, total: productFiltered.price });
  } else {
    updatePrices(sameProduct, "+");
  }
  saveLocalStorage("products", cart);
  renderCards(cartContainer, cart, createCartOfCart);
  getPriceTotal();
};
const updatePrices = (product, operator) => {
  if (operator == "+") {
    product.quantity = product.quantity + 1;
    product.total = product.price * product.quantity;
  } else {
    product.quantity = product.quantity - 1;
    product.total = product.price * product.quantity;
  }
};
const removeProductInCart = (product) => {
  cart = cart.filter((prod) => prod.id != product);
  renderCards(cartContainer, cart, createCartOfCart);
  return saveLocalStorage("products", cart);
};
const getPriceTotal = () => {
  // obtiene la suma de todos los precios en el carrito
  let price = 0;
  cart.map((products) => {
    price += products.total;
  });
  cartPriceTotal.innerHTML = `$ ${price}`;
  cartPriceSubTotal.innerHTML = `$ ${price}`;
};
const increaseQuantity = (e) => {
  // aumenta la cantidad y ajusta el precio de los productos en el carrito
  let btnAdd = e.target.classList.contains("btn-add");
  let btnRemove = e.target.classList.contains("btn-remove");

  if (btnAdd) {
    const productID = e.target.dataset.id;
    let productFilter = cart.find((prod) => prod.id == productID);
    if (productFilter) {
      updatePrices(productFilter, "+");
      renderCards(cartContainer, cart, createCartOfCart);
      saveLocalStorage("products", cart);
    }
  }
  if (btnRemove) {
    const productID = e.target.dataset.id;
    let productFilter = cart.find((prod) => prod.id == productID);

    if (productFilter.quantity <= 1) removeProductInCart(productID);

    updatePrices(productFilter, "-");
    renderCards(cartContainer, cart, createCartOfCart);
    saveLocalStorage("products", cart);
  }
  getPriceTotal();
};

const init = () => {
  renderCardsRecomended(
    cardsRecomendedContainer,
    products,
    createCardRecomended
  );
  renderCards(cardsContainer, products, createCard);
  cardsContainer.addEventListener("click", addProductInCart);
  renderCards(cartContainer, cart, createCartOfCart);
  cartIcon.addEventListener("click", openMenu);
  cartContainer.addEventListener("click", increaseQuantity);
  getPriceTotal();
};
init();
