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

  var activateMap = function (evt) {

    if (document.querySelector('.map--faded')) {
      window.utils.mapSection.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      renderAdvertsOnMap();

      window.utils.enableInputs();

      // -----------меняю значение в поле адрес - определяю их по концу метки
      addressField.value = (START_MAIN_PIN_COORD_X + MAIN_PIN_WIDTH / 2) + ', ' + (START_MAIN_PIN_COORD_Y + MAIN_PIN_HEIGHT + PIN_ARROWHEAD_HEIGHT);

      mainPin.removeEventListener('keydown', onPinPressEnter);
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var limitCoords = function (element, minCoord, maxCoord, axis) {
        var coord = 0;
        if (axis === 'y') {
          if (element.offsetTop - shift.y > MAX_Y_COORD) {
            coord = MAX_Y_COORD;
          } else if (element.offsetTop - shift.y < MIN_Y_COORD) {
            coord = MIN_Y_COORD;
          } else {
            coord = element.offsetTop - shift.y;
          }

        } else if (axis === 'x') {
          if (element.offsetLeft - shift.x > MAX_X_COORD) {
            coord = MAX_X_COORD;
          } else if (element.offsetLeft - shift.x < MIN_X_COORD) {
            coord = MIN_X_COORD;
          } else {
            coord = element.offsetLeft - shift.x;
          }
        }
        return coord;
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = limitCoords(mainPin, MIN_Y_COORD, MAX_Y_COORD, 'y') + 'px';
      mainPin.style.left = limitCoords(mainPin, MIN_X_COORD, MAX_X_COORD, 'x') + 'px';

      addressField.value = (limitCoords(mainPin, MIN_X_COORD, MAX_X_COORD, 'x') + MAIN_PIN_WIDTH / 2) + ', ' + (limitCoords(mainPin, MIN_Y_COORD, MAX_Y_COORD, 'y') + PIN_ARROWHEAD_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (evt.keyCode !== window.utils.ENTER_KEYCODE) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
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
