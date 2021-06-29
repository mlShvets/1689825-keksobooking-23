import { SIMILAR_AD_COUNT, createAd } from './data.js';
import { createAdMarker } from './map.js';
import './form.js';

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(createAd);

similarAds.forEach((dataAd) => createAdMarker(dataAd));
