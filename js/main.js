import { SIMILAR_AD_COUNT, createAd } from './data.js';
import { createCard } from './card.js';
import { toggleFormState } from './form.js';

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(createAd);

const similarListAd = document.querySelector('#map-canvas');

similarListAd.appendChild(createCard(similarAds[0]));

toggleFormState(true);
