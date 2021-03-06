import { resetDataMap } from './map.js';
import { sendData } from './api.js';
import { showMessageSendSuccess, showMessageSendError } from './messages.js';
import { previewAvatar, previewPhoto } from './photos.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MAX_ROOM_NUMBER = 100;
const MIN_GUESTS = 0;
const STATUS_ENABLE = true;
const STATUS_DISABLE = false;
const PREVIEW_AVATAR_DEFAULT = 'img/muffin-grey.svg';
const PROPERTY_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const titleAdInput = adForm.querySelector('#title');
const priceAdInput = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const propertyTypes = adForm.querySelector('#type');
const checkInTime = adForm.querySelector('#timein');
const checkOutTime = adForm.querySelector('#timeout');
const resetButton = document.querySelector('.ad-form__reset');

const toggleFormState = (isEnabled) => {
  if (!isEnabled) {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }
  for (const element of [...adForm]) {
    element.disabled = !isEnabled;
  }
  for (const element of [...mapForm]) {
    element.disabled = !isEnabled;
  }
};

const enableForm = () => toggleFormState(STATUS_ENABLE);
const disableForm = () => toggleFormState(STATUS_DISABLE);

disableForm();

titleAdInput.addEventListener('input', () => {
  const valueLength = titleAdInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleAdInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleAdInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleAdInput.setCustomValidity('');
  }

  titleAdInput.reportValidity();
});

const getPlaceholderValue = () => {
  priceAdInput.placeholder = PROPERTY_PRICE[propertyTypes.value];
};

const getMinPrice = () => {
  priceAdInput.min = PROPERTY_PRICE[propertyTypes.value];
};

priceAdInput.addEventListener('input', () => {
  getMinPrice();
  if (priceAdInput.value > MAX_PRICE_VALUE) {
    priceAdInput.setCustomValidity(`Максимальная цена ${MAX_PRICE_VALUE} руб.`);
  }
  else {
    priceAdInput.setCustomValidity('');
  }

  priceAdInput.reportValidity();
});

const roomCapacityHandler = () => {

  const roomsValue = +roomNumber.value;
  const guestsValue = +capacity.value;

  if (roomsValue < guestsValue) {
    capacity.setCustomValidity('Выберите меньшее количество гостевых мест');
  } else if (roomsValue !== MAX_ROOM_NUMBER && guestsValue === MIN_GUESTS) {
    capacity.setCustomValidity('Выберите количество гостевых мест');
  } else if (roomsValue === MAX_ROOM_NUMBER && guestsValue !== MIN_GUESTS) {
    capacity.setCustomValidity('Гостевые места не предусмотрены');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
};

roomNumber.addEventListener('change', roomCapacityHandler);
capacity.addEventListener('change', roomCapacityHandler);

const getPriceValue = () => {
  getPlaceholderValue();
  getMinPrice();
};

propertyTypes.addEventListener('change', () => {
  getPriceValue();
});

checkInTime.addEventListener('change', () => {
  checkOutTime.value = checkInTime.value;
});
checkOutTime.addEventListener('change', () => {
  checkInTime.value = checkOutTime.value;
});

const clearForm = () => {
  mapForm.reset();
  adForm.reset();
  resetDataMap();
  getPlaceholderValue();
  previewAvatar.src = PREVIEW_AVATAR_DEFAULT;
  previewPhoto.style = '';
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(
    showMessageSendSuccess,
    showMessageSendError,
    formData);
});

export { enableForm, clearForm };
