// esta funcion retorna 3 numeros aleatorios que son usados para renderizar las cards recomendadas
const getRandomNumbers = () => {
  const numbers = [];
  while (numbers.length != 3) {
    const number = Math.floor(Math.random() * 8);
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  return numbers;
};

const saveLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
const openMenu = () => {
  cartContent.classList.toggle("open-cart");
};
