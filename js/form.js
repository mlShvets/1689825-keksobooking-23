const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MAX_ROOM_NUMBER = 100;
const STATUS_ENABLE = true;
const STATUS_DISABLE = false;
const propertyPrice = {
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

priceAdInput.addEventListener('input', () => {
  if (priceAdInput.value > MAX_PRICE_VALUE) {
    priceAdInput.setCustomValidity(`Максимальная цена ${MAX_PRICE_VALUE} руб.`);
  }
  else {
    priceAdInput.setCustomValidity('');
  }

  priceAdInput.reportValidity();
});

capacity.addEventListener('change', () => {

  const roomsValue = +roomNumber.value;
  const guestsValue = +capacity.value;

  if (roomsValue < guestsValue) {
    capacity.setCustomValidity('Выберите меньшее количество гостевых мест');
  } else if (roomsValue !== MAX_ROOM_NUMBER && guestsValue === 0) {
    capacity.setCustomValidity('Выберите количество гостевых мест');
  } else if (roomsValue === MAX_ROOM_NUMBER && guestsValue !== 0) {
    capacity.setCustomValidity('Гостевые места не предусмотрены');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
});

propertyTypes.addEventListener('change', () => {
  priceAdInput.placeholder = propertyPrice[propertyTypes.value];
  priceAdInput.min = propertyPrice[propertyTypes.value];
});

checkInTime.addEventListener('change', () => {
  checkOutTime.value = checkInTime.value;
});
checkOutTime.addEventListener('change', () => {
  checkInTime.value = checkOutTime.value;
});

export { enableForm, disableForm };
