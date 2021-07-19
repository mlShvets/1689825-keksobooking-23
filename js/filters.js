const DEFAUL_VALUE = 'any';
const PRICES_VALUE = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};
const PRICES_RANGE = {
  LOW: 10000,
  HIGH: 50000,
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

const filterTypes = (ad) =>
  housingType.value === DEFAUL_VALUE || ad.offer.type === housingType.value;

const filterRooms = (ad) =>
  housingRooms.value === DEFAUL_VALUE || ad.offer.rooms === Number(housingRooms.value);

const filterGuests = (ad) =>
  housingGuests.value === DEFAUL_VALUE || ad.offer.guests === Number(housingGuests.value);

const filterPrices = (ad) =>
  (housingPrice.value === PRICES_VALUE.MIDDLE && PRICES_RANGE.LOW <= ad.offer.price && ad.offer.price <= PRICES_RANGE.HIGH) ||
  (housingPrice.value === PRICES_VALUE.LOW && ad.offer.price < PRICES_RANGE.LOW) ||
  (housingPrice.value === PRICES_VALUE.HIGH && ad.offer.price > PRICES_RANGE.HIGH) ||
  (housingPrice.value === DEFAUL_VALUE);

const filterFeatures = (ad) => Array.from(housingFeatures).every((checkbox) => {
  if (!checkbox.checked) {
    return true;
  }
  if (!ad.offer.features) {
    return false;
  }
  return ad.offer.features.includes(checkbox.value);
});

const filterAds = (ads) => ads.filter((ad) =>
  filterTypes(ad) &&
  filterPrices(ad) &&
  filterRooms(ad) &&
  filterGuests(ad) &&
  filterFeatures(ad),
);

const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export { filterAds, setFilterChange };
