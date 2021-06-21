const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

function getInactiveForm() {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  [...adForm].forEach((element) => {
    element.disabled = true;
  });
  [...mapForm].forEach((element) => {
    element.disabled = true;
  });
}

function getActiveForm() {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  [...adForm].forEach((element) => {
    element.disabled = false;
  });
  [...mapForm].forEach((element) => {
    element.disabled = false;
  });
}

export { getInactiveForm, getActiveForm };
