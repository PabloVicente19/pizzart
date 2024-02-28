const cardsContainer = document.querySelector(".cards-products");
const cardsRecomendedContainer = document.querySelector(".cards-container");

const products = [...pizzas];
let cart = JSON.parse(localStorage.getItem("products")) || [];

// creo la cards de los productos
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
            <button class="card-product-btn">Agregar</button>
          </div>
    `;
};
const renderCards = () => {
  return (cardsContainer.innerHTML = pizzas.map(createCard).join(""));
};
// creo las cards recomendadas
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
  <button class="card-btn">agregar</button>
</div>`;
};
const renderCardsRecomended = () => {
  const ids = getRandomNumbers();
  const productsFiltered = pizzas.filter((obj) => ids.includes(obj.id));
  cardsRecomendedContainer.innerHTML = productsFiltered
    .map(createCardRecomended)
    .join("");
};

const init = () => {
  renderCardsRecomended();
  renderCards();
};
init();
