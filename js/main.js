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
var MAX_NUMBERS_AMOUNT = 10;
var MIN_NUMBERS_AMOUNT = 1;
var MAX_GUESTS_AMOUNT = 10;
var MIN_GUESTS_AMOUNT = 1;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_Y_COORD = 130;
var MAX_Y_COORD = 630;
var MIN_X_COORD = PIN_WIDTH / 2;
var MAX_X_COORD = map.getBoundingClientRect().width - PIN_WIDTH / 2;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterContainer = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');

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

var createPin = function (advert) {

  var newPin = pinTemplate.cloneNode(true);
  newPin.querySelector('img').src = advert.autor.avatar;
  newPin.style.left = advert.location.x + 'px';
  newPin.style.top = advert.location.y + 'px';
  return newPin;
};

var renderAdvertsOnMap = function () {
  var adverts = createAdvertsArray(ADVERTS_AMOUNT);
  for (var i = 0; i < ADVERTS_AMOUNT; i++) {
    var pin = createPin(adverts[i]);
    fragment.appendChild(pin);

    var addEventListenerToPin = function (pinElement, advertElement) {
      pinElement.addEventListener('click', function () {
        renderCard(advertElement);
      });
    };

    addEventListenerToPin(pin, adverts[i]);
  }
  mapPins.appendChild(fragment);
};

var renderCard = function (advert) {

  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = advert.offer.title;
  newCard.querySelector('.popup__text--address').textContent = advert.offer.adress;

  newCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = RUSSIAN_TYPES[advert.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнат(-а/-ы) для ' + advert.offer.guests + ' гостей(-я)';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout + '.';
  newCard.querySelector('.popup__features').textContent = advert.offer.features;
  newCard.querySelector('.popup__description').textContent = advert.offer.description;

  newCard.querySelector('.popup__photos').innerHTML = '';
  for (var j = 0; j < advert.offer.photos.length; j++) {
    var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos').querySelector('img');
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = advert.offer.photos[j];
    newCard.querySelector('.popup__photos').appendChild(newPhoto);
  }
  newCard.querySelector('.popup__avatar').src = advert.autor.avatar;
  map.insertBefore(newCard, filterContainer);

  var popupButtonClose = newCard.querySelector('.popup__close');

  popupButtonClose.addEventListener('click', function () {
    newCard.remove();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      newCard.remove();
    }
  });
};

// ----------  деактивирую все инпуты в форме объявления
var formFieldsets = document.querySelectorAll('fieldset');
for (var i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].setAttribute('disabled', 'disabled');
}

// ----------  деактивирую все инпуты в фильтрах на карте
var mapFilterInputs = document.querySelector('.map__filters').querySelectorAll('select');
for (i = 0; i < mapFilterInputs.length; i++) {
  mapFilterInputs[i].setAttribute('disabled', 'disabled');
}

// ----------   добавляю координаты в поле адрес в неактивном состоянии
addressField.value = (START_MAIN_PIN_COORD_X + MAIN_PIN_WIDTH / 2) + ', ' + (START_MAIN_PIN_COORD_Y + MAIN_PIN_HEIGHT / 2);

var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderAdvertsOnMap();

  for (i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }

  for (i = 0; i < mapFilterInputs.length; i++) {
    mapFilterInputs[i].removeAttribute('disabled');
  }

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

mainPin.addEventListener('mousemove', function (evt) {
  addressField.value = evt.pageX + ', ' + (evt.pageY + (MAIN_PIN_HEIGHT / 2) + PIN_ARROWHEAD_HEIGHT);
});

// ---------- ВАЛИДАЦИЯ ПОЛЕЙ -----------------

var titleField = document.querySelector('#title');
var priceField = document.querySelector('#price');
var typeField = document.querySelector('#type');
var timeInField = document.querySelector('#timein');
var timeOutField = document.querySelector('#timeout');


var validateTitleInput = function (titleElement) {
  titleElement.setAttribute('minlength', 30);
  titleElement.setAttribute('maxlength', 100);
};

var validatePriceInput = function (priceElement, type) {
  priceElement.removeAttribute('min');
  priceElement.setAttribute('required', 'required');
  priceElement.setAttribute('max', 1000000);

  if (type.value === 'bungalo') {
    priceElement.setAttribute('min', 0);
  } else if (type.value === 'flat') {
    priceElement.setAttribute('min', 1000);
  } else if (type.value === 'house') {
    priceElement.setAttribute('min', 5000);
  } else if (type.value === 'palace') {
    priceElement.setAttribute('min', 10000);
  }
};

var setTimeOutInput = function (timeInElement, timeOutElement) {
  for (i = 0; i < timeOutElement.children.length; i++) {
    // timeOutElement.children[i].removeAttribute('selected');

    if (timeInElement.value === timeOutElement.children[i].value) {
      timeOutElement.children[i].setAttribute('selected', 'selected');
    } else {
      timeOutElement.children[i].removeAttribute('selected');
    }
  }
};

var setTimeInInput = function (timeInElement, timeOutElement) {
  for (i = 0; i < timeInElement.children.length; i++) {
    // timeInElement.children[i].removeAttribute('selected');

    if (timeOutElement.value === timeInElement.children[i].value) {
      timeInElement.children[i].setAttribute('selected', 'selected');
    } else {
      timeInElement.children[i].removeAttribute('selected');
    }
  }
};

titleField.setAttribute('required', 'required');
priceField.setAttribute('required', 'required');
addressField.setAttribute('readonly', 'readonly');

titleField.addEventListener('input', function () {
  validateTitleInput(titleField);
});

priceField.addEventListener('input', function () {
  validatePriceInput(priceField, typeField);
});

timeInField.addEventListener('change', function () {
  setTimeOutInput(timeInField, timeOutField);
});

timeOutField.addEventListener('change', function () {
  setTimeInInput(timeInField, timeOutField);
});

// -------------ОГРАНИЧЕНИЕ НА ВВОД ПОЛЕЙ  -------

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var validateRoomsAndGuestsSelects = function (roomsSelect, guestsSelect) {

  var guestsAmountOptions = guestsSelect.children;
  for (i = 0; i < guestsAmountOptions.length; i++) {
    guestsAmountOptions[i].removeAttribute('disabled');

    // ------- блокирую, если количество гостей больше, чем комнат
    if (guestsAmountOptions[i].value > roomsSelect.value) {
      guestsAmountOptions[i].setAttribute('disabled', 'disabled');
    }

    // ------- блокирую все варианты гостей, кроме "не для гостей", если очень много комнат - условно ввел MAX_ROOMS_AVAILABLE = 5 - сюда будет попадать "100 комнат".
    if ((roomsSelect.value > MAX_ROOMS_AVAILABLE) && (guestsAmountOptions[i].value > 0)) {
      guestsAmountOptions[i].setAttribute('disabled', 'disabled');
    }

    // блокирую вариант "не для гостей", если количество комнат не превышает допустимое MAX_ROOMS_AVAILABLE
    if ((roomsSelect.value < MAX_ROOMS_AVAILABLE) && (guestsAmountOptions[i].value < 1)) {
      guestsAmountOptions[i].setAttribute('disabled', 'disabled');
    }
  }

  // --------- ОБРАТНАЯ БЛОКИРОВКА - ------
  var roomsAmountOptions = roomsSelect.children;
  for (i = 0; i < roomsAmountOptions.length; i++) {
    roomsAmountOptions[i].removeAttribute('disabled');

    // блокирую, если количество комнат меньше, чем количество гостей
    if (roomsAmountOptions[i].value < guestsSelect.value) {
      roomsAmountOptions[i].setAttribute('disabled', 'disabled');
    }

    // блокирую все варианты количества комнат, кроме 100, если выбран вариант "не для гостей"
    if ((guestsSelect.value < 1) && (roomsAmountOptions[i].value < MAX_ROOMS_AVAILABLE)) {
      roomsAmountOptions[i].setAttribute('disabled', 'disabled');
    }

    // блокирую "100 комнат", если выбран 1 гость
    if ((+guestsSelect.value === 1) && (roomsAmountOptions[i].value > MAX_ROOMS_AVAILABLE)) {
      roomsAmountOptions[i].setAttribute('disabled', 'disabled');
    }
  }

  // разблокировываю селек с комнатами, если выбраны "100 комнат"" и "не для гостей"
  if ((+roomNumber.value === 100) && (+capacity.value === 0)) {
    for (i = 0; i < roomsAmountOptions.length; i++) {
      roomsAmountOptions[i].removeAttribute('disabled');
    }
  }
};

roomNumber.addEventListener('change', function () {
  validateRoomsAndGuestsSelects(roomNumber, capacity);
});

capacity.addEventListener('change', function () {
  validateRoomsAndGuestsSelects(roomNumber, capacity);
});
