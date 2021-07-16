import { markerGroup, createMarkersGroup } from './map.js';

const MAX_NUM_ADS = 10;
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

const filteringTypes = (ad) =>
  housingType.value === DEFAUL_VALUE || ad.offer.type === housingType.value;

const filteringRooms = (ad) =>
  housingRooms.value === DEFAUL_VALUE || ad.offer.rooms === Number(housingRooms.value);

const filteringGuests = (ad) =>
  housingGuests.value === DEFAUL_VALUE || ad.offer.guests === Number(housingGuests.value);

const filteringPrices = (ad) =>
  (housingPrice.value === PRICES_VALUE.MIDDLE && PRICES_RANGE.LOW <= ad.offer.price && ad.offer.price <= PRICES_RANGE.HIGH) ||
  (housingPrice.value === PRICES_VALUE.LOW && ad.offer.price < PRICES_RANGE.LOW) ||
  (housingPrice.value === PRICES_VALUE.HIGH && ad.offer.price > PRICES_RANGE.HIGH) ||
  (housingPrice.value === DEFAUL_VALUE);

const filteringFeatures = (ad) => Array.from(housingFeatures).every((checkbox) => {
  if (!checkbox.checked) {
    return true;
  }
  if (!ad.offer.features) {
    return false;
  }
  return ad.offer.features.includes(checkbox.value);
});

const onFilter = (ads) => {
  const filteredAds = ads.filter((ad) => (
    filteringTypes(ad) &&
    filteringPrices(ad) &&
    filteringRooms(ad) &&
    filteringGuests(ad) &&
    filteringFeatures(ad)
  ));
  markerGroup.clearLayers();
  createMarkersGroup(filteredAds.slice(0, MAX_NUM_ADS));
};

const onFilterChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export { onFilter, MAX_NUM_ADS, onFilterChange };
