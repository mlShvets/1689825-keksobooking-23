const TYPES_IN_RUSSIAN = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const PICTURE_WIDHT = 45;
const PICTURE_HEIGHT = 40;

const createCard = (ad) => {
  const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adElement = similarAdTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = TYPES_IN_RUSSIAN[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const featureAd = adElement.querySelector('.popup__features');
  if (ad.offer.features.length !== 0) {
    featureAd.innerHTML = '';
    ad.offer.features.forEach((feature) => {
      const item = document.createElement('li');
      item.classList.add('popup__feature');
      item.classList.add(`popup__feature--${feature}`);
      featureAd.appendChild(item);
    });
  } else {
    featureAd.classList.add('.visually-hidden');
  }

  if (ad.offer.description.length !== 0) {
    adElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    adElement.querySelector('.popup__description').classList.add('.visually-hidden');
  }

  const photoAd = adElement.querySelector('.popup__photos');
  if (ad.offer.photos.length !== 0) {
    photoAd.innerHTML = '';
    ad.offer.photos.forEach((photo) => {
      const picture = document.createElement('img');
      picture.classList.add('popup__photo');
      picture.src = photo;
      picture.width = PICTURE_WIDHT;
      picture.height = PICTURE_HEIGHT;
      picture.alt = 'Фотография жилья';
      photoAd.appendChild(picture);
    });
  } else {
    photoAd.classList.add('.visually-hidden');
  }

  adElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return adElement;
};

export { createCard };
