'use strict';

(function () {

  // var ADVERTS_AMOUNT = 8;
  var ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var AccommodationTypesRus = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var MIN_INDEX_TYPES = 0;
  var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var MIN_INDEX_TIMES = 0;
  var MAX_NUMBER_PRICE = 100000;
  var MIN_NUMBER_PRICE = 0;
  var MAX_NUMBERS_AMOUNT = 10;
  var MIN_NUMBERS_AMOUNT = 1;
  var MAX_GUESTS_AMOUNT = 10;
  var MIN_GUESTS_AMOUNT = 1;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MIN_X_COORD = PIN_WIDTH / 2;
  var MAX_X_COORD = window.util.map.getBoundingClientRect().width - PIN_WIDTH / 2;
  var START_MAIN_PIN_COORD_X = 570;
  var START_MAIN_PIN_COORD_Y = 375;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var PIN_ARROWHEAD_HEIGHT = 22;
  var MAX_ROOMS_AVAILABLE = 5;
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
  var MIN_INDEX_DESCRIPTION = 0;

  var getRandomNumber = function (min, max, isInteger) {
    if (isInteger) {
      var randomNumber = min + Math.round(Math.random() * (max - min));
    } else {
      randomNumber = min + Math.floor(Math.random() * (max - min));
    }
    return randomNumber;
  };

  var getRandomArray = function (array) {
    var randomArray = [];
    for (var i = 0; i < getRandomNumber(1, array.length, false); i++) {
      randomArray[i] = array[getRandomNumber(1, array.length, false)];
    }
    return randomArray;
  };

  var createAdvertsArray = function (amount) {
    var adverts = [];
    for (var i = 0; i < amount; i++) {
      var location = {
        'x': (getRandomNumber(MIN_X_COORD, MAX_X_COORD, false) - PIN_WIDTH / 2),
        'y': (getRandomNumber(MIN_Y_COORD, MAX_Y_COORD, true) - PIN_HEIGHT / 2),
      };
      adverts[i] = {
        'autor': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },

        'offer': {
          'title': 'Объявление ' + (i + 1),
          'address': '"' + location.x + ', ' + location.y + '"',
          'price': getRandomNumber(MIN_NUMBER_PRICE, MAX_NUMBER_PRICE, true),
          'type': ACCOMMODATION_TYPES[getRandomNumber(MIN_INDEX_TYPES, ACCOMMODATION_TYPES.length, false)],
          'rooms': getRandomNumber(MIN_NUMBERS_AMOUNT, MAX_NUMBERS_AMOUNT, true),
          'guests': getRandomNumber(MIN_GUESTS_AMOUNT, MAX_GUESTS_AMOUNT, true),
          'checkin': CHECK_IN_TIMES[getRandomNumber(MIN_INDEX_TIMES, CHECK_IN_TIMES.length, false)],
          'checkout': CHECK_OUT_TIMES[getRandomNumber(MIN_INDEX_TIMES, CHECK_OUT_TIMES.length, false)],
          'features': getRandomArray(FACILITIES),
          'description': descriptionsArray[getRandomNumber(MIN_INDEX_DESCRIPTION, descriptionsArray.length, false)],
          'photos': getRandomArray(PHOTOS_URLS_ARRAY),
        },

        'location': location
      };
    }
    return adverts;
  };

  window.createMocks = {
    AccommodationTypesRus: AccommodationTypesRus,
    createAdvertsArray: createAdvertsArray(),
    START_MAIN_PIN_COORD_X: START_MAIN_PIN_COORD_X,
    START_MAIN_PIN_COORD_Y: START_MAIN_PIN_COORD_Y,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    PIN_ARROWHEAD_HEIGHT: PIN_ARROWHEAD_HEIGHT,
    MAX_ROOMS_AVAILABLE: MAX_ROOMS_AVAILABLE
  };
})();
