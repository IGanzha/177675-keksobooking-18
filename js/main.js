'use strict';
var map = document.querySelector('.map');
var ADVERTS_AMOUNT = 8;

var NUMBER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MIN_INDEX_TYPES = 0;
var RUSSIAN_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var MIN_INDEX_TIMES = 0;
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
var MIN_X_COORD = PIN_WIDTH / 2;
var MAX_X_COORD = map.getBoundingClientRect().width - PIN_WIDTH / 2;
var ENTER_KEYCODE = 13;
// var ESC_KEYCODE = 27; на будущее
var START_MAIN_PIN_COORD_X = 570;
var START_MAIN_PIN_COORD_Y = 375;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_WIDTH = 65;
var PIN_ARROWHEAD_HEIGHT = 22;

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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterContainer = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');

// map.classList.remove('map--faded');

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
        'type': NUMBER_TYPES[getRandomNumber(MIN_INDEX_TYPES, NUMBER_TYPES.length, false)],
        'rooms': getRandomNumber(MIN_NUMBER_AMOUNT, MAX_NUMBER_AMOUNT, true),
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

var createPin = function (advert) {

  var newPin = pinTemplate.cloneNode(true);
  newPin.querySelector('img').src = advert.autor.avatar;
  newPin.style.left = advert.location.x + 'px';
  newPin.style.top = advert.location.y + 'px';
  return newPin;
};

// ------------------ Тревис ругается, что она нигде не используется. Но мы по заданию вызов функции убрали... как быть?

var renderPins = function () {
  var adverts = createAdvertsArray(ADVERTS_AMOUNT);
  for (var i = 0; i < ADVERTS_AMOUNT; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  mapPins.appendChild(fragment);

};

// renderPins();

// ---------------------аналогично -  ругается Тревис

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

  newCard.querySelector('.popup__photos').innerHTML = '';
  for (var i = 0; i < array[0].offer.photos.length; i++) {
    var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos').querySelector('img');
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = array[0].offer.photos[i];
    newCard.querySelector('.popup__photos').appendChild(newPhoto);
  }
  newCard.querySelector('.popup__avatar').src = array[0].autor.avatar;
  return newCard;
};

// map.insertBefore(renderCard(), filterContainer);

// ----------  деактивирую все инпуты
var formFieldsets = document.querySelectorAll('fieldset');
for (var i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].setAttribute('disabled', 'disabled');
}

// ----------   добавляю координаты в поле адрес в неактивном состоянии
addressField.value = (START_MAIN_PIN_COORD_X + MAIN_PIN_WIDTH / 2) + ', ' + (START_MAIN_PIN_COORD_Y + MAIN_PIN_HEIGHT / 2);

// ТЗ: "Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;"
// форма ad-form заблокирована с помощью класса ad-form--disabled, но для формы .map__filters подобного класса нет! Поэтому просто скрываю её через добавление класса hidden
filterContainer.classList.add('hidden');

// ------- активация карты по щелчку и нажатию Enter
var activateMap = function () {
  map.classList.remove('map--faded');
  filterContainer.classList.remove('hidden');
  adForm.classList.remove('ad-form--disabled');

  // -----------меняю значение в поле адрес - определяю их по концу метки
  addressField.value = (START_MAIN_PIN_COORD_X + MAIN_PIN_WIDTH / 2) + ', ' + (START_MAIN_PIN_COORD_Y + MAIN_PIN_HEIGHT + PIN_ARROWHEAD_HEIGHT);
  // ---------- удаляю обработчики
  mainPin.removeEventListener('mousedown', activateMap);
  mainPin.removeEventListener('keydown', onPinPressEnter);
};

var onPinPressEnter = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
};

mainPin.addEventListener('mousedown', activateMap);
mainPin.addEventListener('keydown', onPinPressEnter);

// ----- добавляю обработчик события mousemove (мы потом будем двигать пин и этот обработчик нам подойдет?), в функцию добавляю изменение координаты в поле с адресом

mainPin.addEventListener('mousemove', function (evt) {

  // корректно брать координаты pageX и pageY? если я буду перетаскивать пин, эти координаты будут соответствовать его центру?
  addressField.value = evt.pageX + ', ' + (evt.pageY + (MAIN_PIN_HEIGHT / 2) + PIN_ARROWHEAD_HEIGHT);
});

// ---------- ограничение ввода полей  -------

var roomsSelect = document.querySelector('#housing-rooms');

roomsSelect.addEventListener('change', function () {

  var guestsSelectOptions = document.querySelector('#housing-guests').children;

  for (i = 0; i < guestsSelectOptions.length; i++) {
    // чтобы при последующей смене количества комнат не оставались проставленные атрибуты disabled, сначала очищаю их у всех элементов
    guestsSelectOptions[i].removeAttribute('disabled');
    if (guestsSelectOptions[i].value > roomsSelect.value) {
      guestsSelectOptions[i].setAttribute('disabled', 'disabled');
    }

    if ((roomsSelect.value > 0) && (roomsSelect.value !== 'any') && (+guestsSelectOptions[i].value === 0)) {
      guestsSelectOptions[i].setAttribute('disabled', 'disabled');
    }
  }
});
