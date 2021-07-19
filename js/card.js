const TYPES_IN_RUSSIAN = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

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
  featureAd.innerHTML = '';
  if (ad.offer.features) {
    ad.offer.features.forEach((feature) => {
      featureAd.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
    });
  } else {
    featureAd.classList.add('visually-hidden');
  }

  const descriptionAd = adElement.querySelector('.popup__description');
  if (ad.offer.description) {
    descriptionAd.textContent = ad.offer.description;
  } else {
    descriptionAd.classList.add('visually-hidden');
  }

  const photoAd = adElement.querySelector('.popup__photos');
  photoAd.innerHTML = '';
  if (ad.offer.photos) {
    ad.offer.photos.forEach((photo) => {
      photoAd.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  } else {
    photoAd.classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return adElement;
};

export { createCard };
