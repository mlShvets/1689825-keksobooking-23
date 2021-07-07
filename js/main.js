import './map.js';
import './form.js';
import './card.js';
import { createMarkersGroup } from './map.js';
import { getData } from './api.js';

const SIMILAR_AD_COUNT = 10;
getData((ads) => {
  createMarkersGroup(ads.slice(0, SIMILAR_AD_COUNT));
});
