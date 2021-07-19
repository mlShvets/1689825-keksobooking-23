import { enableForm } from './form.js';
import { createCard } from './card.js';
import { getData } from './api.js';
import { showMessageGetError } from './messages.js';
import { filterAds, setFilterChange } from './filters.js';
import { debounce } from './util.js';

const MAX_NUM_ADS = 10;
const DECIMAL_PLACES = 5;
const MAP_ZOOM = 12;
const TIMEOUT_DELAY = 500;
const CENTER_TOKYO_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000,
};
const ICON_URL = {
  MAIN_ICON: 'img/main-pin.svg',
  AD_ICON: 'img/pin.svg',
};
const MAIN_MARKER = {
  ICON_SIZES: [52, 52],
  ICON_ANCHOR_SIZES: [26, 52],
};
const AD_MARKER = {
  ICON_SIZES: [40, 40],
  ICON_ANCHOR_SIZES: [20, 40],
};

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas');

const makeIcon = (url, size, anchor) => L.icon({
  iconUrl: url,
  iconSize: size,
  iconAnchor: anchor,
});

const makeMarker = (lat, lng, boolean, icon) => L.marker(
  {
    lat: lat,
    lng: lng,
  },
  {
    draggable: boolean,
    icon: icon,
  },
);

const mainMarker = makeMarker(
  CENTER_TOKYO_COORDINATES.lat,
  CENTER_TOKYO_COORDINATES.lng,
  true,
  makeIcon(ICON_URL.MAIN_ICON, MAIN_MARKER.ICON_SIZES, MAIN_MARKER.ICON_ANCHOR_SIZES),
);

mainMarker.addTo(map);

const setAddress = ({ lat, lng }) => {
  addressInput.value = `${lat.toFixed(DECIMAL_PLACES)}, ${lng.toFixed(DECIMAL_PLACES)}`;
};

setAddress(CENTER_TOKYO_COORDINATES);

mainMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createAdMarker = (dataAd) => {

  const { location } = dataAd;

  const markerAd = makeMarker(
    location.lat,
    location.lng,
    false,
    makeIcon(ICON_URL.AD_ICON, AD_MARKER.ICON_SIZES, AD_MARKER.ICON_ANCHOR_SIZES),
    {
      keepInView: true,
    },
  );

  markerAd.addTo(markerGroup).bindPopup(createCard(dataAd));
};

const createMarkersGroup = (similarAds) => {
  markerGroup.clearLayers();
  similarAds.slice(0, MAX_NUM_ADS).forEach((dataAd) => {
    createAdMarker(dataAd);
  });
};

map
  .on('load', () => {
    enableForm();
    getData(
      (ads) => {
        createMarkersGroup(ads);
        setFilterChange(debounce(() => createMarkersGroup(filterAds(ads)),
          TIMEOUT_DELAY));
      },
      showMessageGetError,
    );
  })
  .setView({
    lat: CENTER_TOKYO_COORDINATES.lat,
    lng: CENTER_TOKYO_COORDINATES.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const resetDataMap = () => {
  markerGroup.clearLayers();

  map.setView(
    CENTER_TOKYO_COORDINATES,
    MAP_ZOOM);

  mainMarker.setLatLng(
    CENTER_TOKYO_COORDINATES,
  );

  setAddress(CENTER_TOKYO_COORDINATES);

  getData((ads) => createMarkersGroup(ads.slice(0, MAX_NUM_ADS)));
};

export { resetDataMap, markerGroup, createMarkersGroup };
