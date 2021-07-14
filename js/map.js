import { enableForm } from './form.js';
import { createCard } from './card.js';
import { getData } from './api.js';
import { showMessageGetError } from './messages.js';
import { onFilter, MAX_NUM_ADS, onFilterChange } from './filters.js';
import { debounce } from './util.js';

const CENTER_TOKYO_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000,
};

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas');

const mainIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
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

addressInput.value = `${mainMarker._latlng.lat.toFixed(5)}, ${mainMarker._latlng.lng.toFixed(5)}`;

mainMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createAdMarker = (dataAd) => {

  const { location } = dataAd;

  const iconAd = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
        onFilterChange(debounce(() => onFilter(ads)));
      },
      showMessageGetError,
    );
  })
  .setView({
    lat: CENTER_TOKYO_COORDINATES.lat,
    lng: CENTER_TOKYO_COORDINATES.lng,
  }, 12);

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
    12);

  mainMarker.setLatLng(
    CENTER_TOKYO_COORDINATES,
  );

  addressInput.value = `${CENTER_TOKYO_COORDINATES.lat.toFixed(5)}, ${CENTER_TOKYO_COORDINATES.lng.toFixed(5)}`;

  getData((ads) => createMarkersGroup(ads.slice(0, MAX_NUM_ADS)));
};

export { resetDataMap, markerGroup, createMarkersGroup };
