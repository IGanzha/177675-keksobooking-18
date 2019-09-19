'use strict';
var ADVERTS_AMOUNT = 8;
var adverts = [];
var NUMBER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var PHOTOS_URLS_ARRAY = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();

map.classList.remove('map--faded');

var createAdvertsArray = function () {
  for (var i = 0; i < ADVERTS_AMOUNT; i++) {
    adverts[i] = {
      'autor': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },

      'offer': {
        'title': 'Объявление ' + (i + 1),
        'address': '"' + location.x + ', ' + location.y + '"', // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        'price': Math.round(Math.random() * 1000000), // число, стоимость
        'type': NUMBER_TYPES[Math.floor(Math.random() * NUMBER_TYPES.length)], // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        'rooms': Math.round(Math.random() * 10), // число, количество комнат
        'guests': Math.round(Math.random() * 1000000), // число, количество гостей, которое можно разместить
        'checkin': CHECK_IN_TIMES[Math.floor(Math.random() * CHECK_IN_TIMES.length)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        'checkout': CHECK_OUT_TIMES[Math.floor(Math.random() * CHECK_OUT_TIMES.length)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        'features': function () {
          var facilities = [];
          for (var j = 0; j < FACILITIES.length * Math.floor(Math.random()); j++) {
            facilities[j] = FACILITIES[Math.floor(Math.random() * FACILITIES.length)];
          }
          return facilities;
        }, // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        'description': 'Описание объявления ' + (i + 1), // строка с описанием,

        'photos': function () {
          var photosUrls = [];
          for (var j = 0; j < PHOTOS_URLS_ARRAY.length * Math.floor(Math.random()); j++) {
            photosUrls[j] = PHOTOS_URLS_ARRAY[Math.floor(Math.random() * PHOTOS_URLS_ARRAY.length)];
          }
          return photosUrls;
        }, // массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      },

      'location': {
        'x': (Math.floor(Math.random() * map.getBoundingClientRect().width) - 25), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        'y': (130 + Math.round(Math.random() * 500) - 70), // случайное число, координата y метки на карте от 130 до 630.
      }
    };
  }
  return adverts;
};

var createPin = function (advert) {

  var newPin = pinTemplate.cloneNode(true);
  newPin.querySelector('img').style.src = advert.autor.avatar;
  newPin.style.left = advert.location.x + 'px';
  newPin.style.top = advert.location.y + 'px';
  return newPin;
};

var renderPins = function () {
  createAdvertsArray();
  for (var i = 0; i < ADVERTS_AMOUNT; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  mapPins.appendChild(fragment);
};

renderPins();
