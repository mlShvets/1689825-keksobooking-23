import { enableForm } from './form.js';
import { createCard } from './card.js';
import { getData } from './api.js';
import { showMessageGetError } from './messages.js';
import { onFilter, MAX_NUM_ADS, onFilterChange } from './filters.js';
import { debounce } from './util.js';

const DECIMAL_PLACES = 5;
const MAP_ZOOM = 12;
const TIMEOUT_DELAY = 500;
const CENTER_TOKYO_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000,
};
const MAIN_MARKER = {
  ICON_SIZE: [52, 52],
  ICON_ANCHOR: [26, 52],
};
const AD_MARKER = {
  ICON_SIZE: [40, 40],
  ICON_ANCHOR: [20, 40],
};

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas');

const mainIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: MAIN_MARKER.ICON_SIZE,
    iconAnchor: MAIN_MARKER.ICON_ANCHOR,
  },
);

const mainMarker = L.marker(
  {
    lat: CENTER_TOKYO_COORDINATES.lat,
    lng: CENTER_TOKYO_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

addressInput.value = `${mainMarker._latlng.lat.toFixed(DECIMAL_PLACES)}, ${mainMarker._latlng.lng.toFixed(DECIMAL_PLACES)}`;

mainMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(DECIMAL_PLACES)}, ${evt.target.getLatLng().lng.toFixed(DECIMAL_PLACES)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createAdMarker = (dataAd) => {

  const { location } = dataAd;

  const iconAd = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: AD_MARKER.ICON_SIZE,
    iconAnchor: AD_MARKER.ICON_SIZE,
  });

  const markerAd = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: iconAd,
    },
    {
      keepInView: true,
    },
  );

  markerAd.addTo(markerGroup).bindPopup(createCard(dataAd));
};

const createMarkersGroup = (similarAds) => {
  similarAds.forEach((dataAd) => {
    createAdMarker(dataAd);
  });
};

map
  .on('load', () => {
    enableForm();
    getData(
      (ads) => {
        onFilter(ads);
        onFilterChange(debounce(() => onFilter(ads), TIMEOUT_DELAY));
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

  addressInput.value = `${CENTER_TOKYO_COORDINATES.lat.toFixed(DECIMAL_PLACES)}, ${CENTER_TOKYO_COORDINATES.lng.toFixed(DECIMAL_PLACES)}`;

  getData((ads) => createMarkersGroup(ads.slice(0, MAX_NUM_ADS)));
};

export { resetDataMap, markerGroup, createMarkersGroup };
