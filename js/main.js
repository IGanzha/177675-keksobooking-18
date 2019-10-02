'use strict';
var ADVERTS_AMOUNT = 8;

var NUMBER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RUSSIAN_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var MAX_NUMBER_PRICE = 100000;
var MIN_NUMBER_PRICE = 0;
var MAX_NUMBER_AMOUNT = 10;
var MIN_NUMBER_AMOUNT = 1;
var MAX_GUESTS_AMOUNT = 10;
var MIN_GUESTS_AMOUNT = 1;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_Y_COORD = 130;
var MAX_Y_COORD = 630;

var PHOTOS_URLS_ARRAY = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var descriptionsArray = [
  'Очень просторное и светлое жилье',
  'Уютное жилье в центре города',
  'Лучший вариант для проживания в районе с богатой инфраструктурой',
  'Магазины и все достопримечательности города прямо под рукой',
  'Лучшего варианта просто не найти - удобный вариант как для одинокой девушки или парня, так и для большой семьи'
];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterContainer = document.querySelector('.map__filters-container');

map.classList.remove('map--faded');

var getRandomNumber = function (min, max, isInteger) { // может параметр isRound получше назвать можно
  if (isInteger) {
    var randomNumber = min + Math.round(Math.random() * (max - min));
  } else {
    randomNumber = min + Math.floor(Math.random() * (max - min));
  }
  return randomNumber;
};

var getRandomArray = function (array) {
  var randomArray = [];
  for (var i = 0; i < getRandomNumber(0, array.length, false); i++) {
    randomArray[i] = array[getRandomNumber(0, array.length, false)];
  }
  return randomArray;
};

var createAdvertsArray = function (amount) {
  var adverts = [];
  for (var i = 0; i < amount; i++) {
    adverts[i] = {
      'autor': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },

      'offer': {
        'title': 'Объявление ' + (i + 1),
        'address': '"' + location.x + ', ' + location.y + '"',
        'price': getRandomNumber(MIN_NUMBER_PRICE, MAX_NUMBER_PRICE, true),
        'type': NUMBER_TYPES[getRandomNumber(0, NUMBER_TYPES.length, false)],
        'rooms': getRandomNumber(MIN_NUMBER_AMOUNT, MAX_NUMBER_AMOUNT, true),
        'guests': getRandomNumber(MIN_GUESTS_AMOUNT, MAX_GUESTS_AMOUNT, true),
        'checkin': CHECK_IN_TIMES[getRandomNumber(0, CHECK_IN_TIMES.length, false)],
        'checkout': CHECK_OUT_TIMES[getRandomNumber(0, CHECK_OUT_TIMES.length, false)],
        'features': getRandomArray(FACILITIES),
        'description': descriptionsArray[getRandomNumber(0, descriptionsArray.length, false)],
        'photos': getRandomArray(PHOTOS_URLS_ARRAY),
      },

      'location': {
        'x': (getRandomNumber(0, map.getBoundingClientRect().width, false) - PIN_WIDTH / 2),
        'y': (getRandomNumber(MIN_Y_COORD, MAX_Y_COORD, true) - PIN_HEIGHT / 2),
      }
    };
  }
  return adverts;
};

var createPin = function (advert) {

  var newPin = pinTemplate.cloneNode(true);
  newPin.querySelector('img').src = advert.autor.avatar;
  newPin.style.left = advert.location.x + 'px';
  newPin.style.top = advert.location.y + 'px';
  return newPin;
};

var renderPins = function () {
  var adverts = createAdvertsArray(ADVERTS_AMOUNT);
  for (var i = 0; i < ADVERTS_AMOUNT; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  mapPins.appendChild(fragment);
};
renderPins();

var renderCard = function () {
  var newCard = cardTemplate.cloneNode(true);
  var array = createAdvertsArray(ADVERTS_AMOUNT);
  newCard.querySelector('.popup__title').textContent = array[0].offer.title;
  newCard.querySelector('.popup__text--address').textContent = array[0].offer.adress;

  newCard.querySelector('.popup__text--price').textContent = array[0].offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = RUSSIAN_TYPES[array[0].offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = array[0].offer.rooms + ' комнат(-а/-ы) для ' + array[0].offer.guests + ' гостей(-я)';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + array[0].offer.checkin + ', выезд до ' + array[0].offer.checkout + '.';
  newCard.querySelector('.popup__features').textContent = array[0].offer.features;
  newCard.querySelector('.popup__description').textContent = array[0].offer.description;

  for (var i = 0; i < array[0].offer.photos.length; i++) {
    var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos').querySelector('img');
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = array[0].offer.photos[i];
    newCard.querySelector('.popup__photos').appendChild(newPhoto);
  }
  newCard.querySelector('.popup__avatar').src = array[0].autor.avatar;
  return newCard;
};

map.insertBefore(renderCard(), filterContainer);
