import { PROPERTY_TYPES, TIMES, FEATURES, PHOTOS, SIMILAR_AD_COUNT, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG } from './data.js';

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

function createAd() {
  const latCoordinate = getRandomDecimalNumber(MIN_LAT, MAX_LAT, 5);
  const lngCoordinate = getRandomDecimalNumber(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },

    offer: {
      title: 'Любой заголовок',
      address: `${latCoordinate}, ${lngCoordinate}`,
      price: getRandomNumber(1000, 10500),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 20),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getShuffleArray(FEATURES),
      description: 'Любое описание',
      photos: getShuffleArray(PHOTOS),
    },

    location: {
      lat: latCoordinate,
      lng: lngCoordinate,
    },
  };
}

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(createAd);

export { similarAds };
