const PROPERTY_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_AD_COUNT = 10;
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;
const USER_NUMBERS = [];

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

for (let i = 1; i <= SIMILAR_AD_COUNT; i++) {
  if (i < 10) {
    USER_NUMBERS.push(`img/avatars/user0${i}.png`);
  }
  else {
    USER_NUMBERS.push(`img/avatars/user${i}.png`);
  }
}

function createAd() {
  const coordinates = [getRandomDecimalNumber(MIN_LAT, MAX_LAT, 5), getRandomDecimalNumber(MIN_LNG, MAX_LNG, 5)];

  return {
    author: {
      avatar: getRandomArrayElement(USER_NUMBERS),
    },

    offer: {
      title: 'Любой заголовок',
      address: coordinates.join(', '),
      price: getRandomNumber(0, 10500),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 20),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayElement(FEATURES),
      description: 'Любое описание',
      photos: getRandomArrayElement(PHOTOS),
    },

    location: {
      lat: coordinates[0],
      lng: coordinates[1],
    },
  };
}

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(createAd);

similarAds;

