function getRandomNumber(minNumber, maxNumber) {
  if (maxNumber <= minNumber || minNumber < 0 || maxNumber < 0) {
    return 'Неверные параметры диапазона';
  }
  return Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber)); // источник https://learn.javascript.ru/task/random-int-min-max
}

getRandomNumber(1, 10);

function getRandomDecimalNumber(minNumber, maxNumber, decimalPlace) {
  if (maxNumber <= minNumber || minNumber < 0 || maxNumber < 0 || decimalPlace < 0) {
    return 'Неверные параметры диапазона';
  }
  const randomNumber = minNumber + Math.random() * (maxNumber + 1 - minNumber);
  return randomNumber.toFixed(decimalPlace);
}

getRandomDecimalNumber(1, 20, 1);
