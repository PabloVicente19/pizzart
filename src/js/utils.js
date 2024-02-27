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
