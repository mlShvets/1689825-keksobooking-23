function getRandomNumber(minNumber, maxNumber) {
  const lower = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  const randomNumber = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(randomNumber);
}

function getRandomDecimalNumber(minNumber, maxNumber, decimalPlace = 1) {
  const lower = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const upper = Math.max(Math.abs(minNumber), Math.abs(maxNumber));
  const randomNumber = Math.random() * (upper - lower) + lower;
  return randomNumber.toFixed(decimalPlace);
}

function getRandomArrayElement(elements) {
  const randomArrayElement = elements[getRandomNumber(0, elements.length - 1)];
  return randomArrayElement;
}

function getShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, getRandomNumber(1, array.length));
}

export { getShuffleArray, getRandomArrayElement, getRandomDecimalNumber, getRandomNumber };
