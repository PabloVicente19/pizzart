const cardsContainer = document.querySelector(".cards-products");

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
renderCards();
const init = () => {};
