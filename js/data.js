import { getShuffleArray, getRandomArrayElement, getRandomDecimalNumber, getRandomNumber } from './util.js';

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

const createAd = () => {
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
};

export { SIMILAR_AD_COUNT, createAd };
