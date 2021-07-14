import { markerGroup, createMarkersGroup } from './map.js';

const MAX_NUM_ADS = 10;
const DEFAUL_VALUE = 'any';
const PRICES_VALUE = {
  low: 'low',
  middle: 'middle',
  high: 'high',
};
const PRICES_RANGE = {
  low: 10000,
  high: 50000,
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

const typeFilter = (ad) =>
  housingType.value === DEFAUL_VALUE || ad.offer.type === housingType.value;

const roomsFilter = (ad) =>
  housingRooms.value === DEFAUL_VALUE || ad.offer.rooms === Number(housingRooms.value);

const guestsFilter = (ad) =>
  housingGuests.value === DEFAUL_VALUE || ad.offer.guests === Number(housingGuests.value);

const priceFilter = (ad) =>
  (housingPrice.value === PRICES_VALUE.middle && PRICES_RANGE.low <= ad.offer.price && ad.offer.price <= PRICES_RANGE.high) ||
  (housingPrice.value === PRICES_VALUE.low && ad.offer.price < PRICES_RANGE.low) ||
  (housingPrice.value === PRICES_VALUE.high && ad.offer.price > PRICES_RANGE.high) ||
  (housingPrice.value === DEFAUL_VALUE);

const featuresfilter = (ad) => Array.from(housingFeatures).every((checkbox) => {
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
    typeFilter(ad) &&
    priceFilter(ad) &&
    roomsFilter(ad) &&
    guestsFilter(ad) &&
    featuresfilter(ad)
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
