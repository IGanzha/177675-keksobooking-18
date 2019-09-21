'use strict';
var ADVERTS_AMOUNT = 8;

var NUMBER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var MAX_NUMBER_PRICE = 1000000;
var MIN_NUMBER_PRICE = 0;
var MAX_NUMBER_AMOUNT = 10;
var MIN_NUMBER_AMOUNT = 0;
var MAX_GUESTS_AMOUNT = 10;
var MIN_GUESTS_AMOUNT = 0;
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
