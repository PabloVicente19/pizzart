const cardsContainer = document.querySelector(".cards-products");
const cardsRecomendedContainer = document.querySelector(".cards-container");
const cartContainer = document.querySelector(".cart-products-list");
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
    <button class="btn-remove">-</button>
    <span class="cant">${quantity}</span>
    <button class="btn-add">+</button>
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
    sameProduct.quantity++;
    sameProduct.total = sameProduct.price * sameProduct.quantity;
  }
  saveLocalStorage("products", cart);
  renderCards(cartContainer, cart, createCartOfCart);
};
const addOrRemoveProductFromCart = () => {};
const init = () => {
  renderCardsRecomended(
    cardsRecomendedContainer,
    products,
    createCardRecomended
  );
  renderCards(cardsContainer, products, createCard);
  cardsContainer.addEventListener("click", addProductInCart);
  renderCards(cartContainer, cart, createCartOfCart);
};
init();

cartContainer.addEventListener("click", (e) => {
  let btnClick = e.target.contains("btn-remove");
  if (btnClick) {
    console.log(e.target);
  }
  console.log(btnClick);
});
