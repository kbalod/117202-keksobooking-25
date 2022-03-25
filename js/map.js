import {generatorAd} from './ad.js';
import {greatAds} from './data.js';

const ADFORM = document.querySelector('.ad-form');
const adress = ADFORM.querySelector('#address');
const resetButton = ADFORM.querySelector('.ad-form__reset');
const ADS_LENGTH = 10;

const randomAds = Array.from({length: ADS_LENGTH},greatAds);

const map = L.map('map-canvas').on('load', () => {
}).setView({lat: 35.7533,lng: 139.6369,}, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({lat: 35.7533,lng: 139.6369,},{draggable: true,icon: mainPinIcon,},);
mainPinMarker.on('moveend', (evt) => {
  adress.value = Object.values(evt.target.getLatLng()).map((element) => element.toFixed(5)).join(',');
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.7533,
    lng: 139.6369,
  });
  map.setView({
    lat: 35.7533,
    lng: 139.6369,
  }, 10);
});
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


randomAds.forEach((it) => {
  const {lat,lng} = it.location;
  const marker = L.marker({lat,lng},{icon});
  marker.addTo(map).bindPopup(generatorAd(it));
});
mainPinMarker.addTo(map);
export {map,mainPinMarker};
