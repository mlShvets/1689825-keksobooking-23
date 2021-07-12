import { debounce } from './util.js';
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

const onFilter = (ads) => {
  const filteredAds = ads.filter((ad) => {
    if (housingType.value !== DEFAUL_VALUE && ad.offer.type !== housingType.value) {
      return false;
    }
    if (housingRooms.value !== DEFAUL_VALUE && ad.offer.rooms !== Number(housingRooms.value)) {
      return false;
    }
    if (housingGuests.value !== DEFAUL_VALUE && ad.offer.guests !== Number(housingGuests.value)) {
      return false;
    }
    if (housingPrice.value !== DEFAUL_VALUE) {
      if (housingPrice.value === PRICES_VALUE.middle && (ad.offer.price < PRICES_RANGE.low || ad.offer.price > PRICES_RANGE.high)) {
        return false;
      }
      if (housingPrice.value === PRICES_VALUE.low && ad.offer.price > PRICES_RANGE.low) {
        return false;
      }
      if (housingPrice.value === PRICES_VALUE.high && ad.offer.price < PRICES_RANGE.high) {
        return false;
      }
    }
    const features = ad.offer.features || [];
    for (let i = 0; i < housingFeatures.length; i++) {
      const feature = housingFeatures[i];
      if (feature.checked && !features.includes(feature.value)) {
        return false;
      }
    }
    return true;
  });
  createMarkersGroup(filteredAds.slice(0, MAX_NUM_ADS));
};

const addFilters = (ads) => {
  const debounced = debounce(() => {
    markerGroup.clearLayers();
    onFilter(ads);
  });
  housingType.addEventListener('change', debounced);
  housingPrice.addEventListener('change', debounced);
  housingRooms.addEventListener('change', debounced);
  housingGuests.addEventListener('change', debounced);
  housingFeatures.forEach((feature) => {
    feature.addEventListener('change', debounced);
  });
};

export { onFilter, addFilters, MAX_NUM_ADS };
