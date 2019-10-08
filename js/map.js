'use strict';

(function () {

  var ADVERTS_AMOUNT = 8;
  var START_MAIN_PIN_COORD_X = 570;
  var START_MAIN_PIN_COORD_Y = 375;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var PIN_ARROWHEAD_HEIGHT = 22;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MIN_X_COORD = 0;
  var MAX_X_COORD = window.utils.mapSection.getBoundingClientRect().width - PIN_WIDTH / 2;

  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');

  var renderAdvertsOnMap = function () {
    var adverts = window.data.createAdvertsArray(ADVERTS_AMOUNT);
    for (var i = 0; i < ADVERTS_AMOUNT; i++) {
      var pin = window.createPin.createPin(adverts[i]);
      fragment.appendChild(pin);

      var addEventListenerToPin = function (pinElement, advertElement) {
        pinElement.addEventListener('click', function () {
          window.renderCard.renderCard(advertElement);
        });
      };

      addEventListenerToPin(pin, adverts[i]);
    }
    mapPins.appendChild(fragment);
  };

  var activateMap = function () {
    window.utils.mapSection.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderAdvertsOnMap();

    for (var i = 0; i < window.utils.formFieldsets.length; i++) {
      window.utils.formFieldsets[i].removeAttribute('disabled');
    }

    for (i = 0; i < window.utils.mapFilterInputs.length; i++) {
      window.utils.mapFilterInputs[i].removeAttribute('disabled');
    }

    // -----------меняю значение в поле адрес - определяю их по концу метки
    addressField.value = (window.data.START_MAIN_PIN_COORD_X + window.data.MAIN_PIN_WIDTH / 2) + ', ' + (window.data.START_MAIN_PIN_COORD_Y + window.data.MAIN_PIN_HEIGHT + window.data.PIN_ARROWHEAD_HEIGHT);

    mainPin.removeEventListener('mousedown', activateMap);
    mainPin.removeEventListener('keydown', pinPressHandler);
  };

  var pinPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activateMap();
    }
  };

  window.utils.disableInputs();

  mainPin.addEventListener('mousedown', activateMap);
  mainPin.addEventListener('keydown', pinPressHandler);

  mainPin.addEventListener('mousemove', function (evt) {
    addressField.value = evt.pageX + ', ' + (evt.pageY + (window.data.MAIN_PIN_HEIGHT / 2) + window.data.PIN_ARROWHEAD_HEIGHT);
  });

  window.map = {
    addressField: addressField,
    START_MAIN_PIN_COORD_X: START_MAIN_PIN_COORD_X,
    START_MAIN_PIN_COORD_Y: START_MAIN_PIN_COORD_Y,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    PIN_ARROWHEAD_HEIGHT: PIN_ARROWHEAD_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MIN_Y_COORD: MIN_Y_COORD,
    MAX_Y_COORD: MAX_Y_COORD,
    MIN_X_COORD: MIN_X_COORD,
    MAX_X_COORD: MAX_X_COORD
  };

})();
