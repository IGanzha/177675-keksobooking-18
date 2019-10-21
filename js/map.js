'use strict';

(function () {

  var START_MAIN_PIN_COORD_X = 570;
  var START_MAIN_PIN_COORD_Y = 375;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var PIN_ARROWHEAD_HEIGHT = 22;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_Y_COORD = 130 - PIN_ARROWHEAD_HEIGHT;
  var MAX_Y_COORD = 630 - PIN_ARROWHEAD_HEIGHT;
  var MIN_X_COORD = 0 - MAIN_PIN_WIDTH / 2;
  var mapSection = document.querySelector('.map');
  var MAX_X_COORD = mapSection.getBoundingClientRect().width - MAIN_PIN_WIDTH / 2;
  var PINS_LIMIT = 5;

  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var mainSection = document.querySelector('main');


  var renderAdvertsOnMap = function (allData) {

    var unlimitedFilteredData = window.filter.getFullyFilteredData(allData);

    var adverts = window.filter.limitData(unlimitedFilteredData, PINS_LIMIT);

    var pinsToDelete = document.querySelectorAll('.map__pin--advert');

    for (var i = 0; i < pinsToDelete.length; i++) {
      pinsToDelete[i].parentNode.removeChild(pinsToDelete[i]);
    }

    for (i = 0; i < adverts.length; i++) {
      var pin = window.createPin.createPin(adverts[i]);
      pin.classList.add('map__pin--advert');
      fragment.appendChild(pin);

      var addListenerToAdvertPin = function (pinElement, advertElement) {
        pinElement.addEventListener('click', function () {
          var currentPinsOnMap = document.querySelectorAll('.map__pin--advert');
          for (i = 0; i < currentPinsOnMap.length; i++) {
            currentPinsOnMap[i].classList.remove('map-pin--active');
          }

          window.renderCard.renderCard(advertElement);
          pinElement.classList.add('map-pin--active');
        });
      };

      addListenerToAdvertPin(pin, adverts[i]);
    }
    mapPins.appendChild(fragment);
  };

  var reloadPins = function () {
    window.utils.removeOpenedAdCard();
    renderAdvertsOnMap(window.nativeData);
  };

  var activateMap = function () {

    if (document.querySelector('.map--faded')) {
      mapSection.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      window.load.load(renderAdvertsOnMap, window.utils.errorHandler);

      window.utils.enableInputs();

      addressField.value = (START_MAIN_PIN_COORD_X + MAIN_PIN_WIDTH / 2) + ', ' + (START_MAIN_PIN_COORD_Y + MAIN_PIN_HEIGHT + PIN_ARROWHEAD_HEIGHT);

      mainPin.removeEventListener('keydown', onPinPressEnter);
    }

    for (var i = 0; i < window.utils.filterSelects.length; i++) {
      window.utils.filterSelects[i].addEventListener('change', window.debounce(reloadPins));
    }

    for (i = 0; i < window.utils.featuresCheckboxes.length; i++) {
      window.utils.featuresCheckboxes[i].addEventListener('change', window.debounce(reloadPins));
    }
  };

  var addListenerToMainPin = function (evt) {

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

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onPinPressEnter = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activateMap();
    }
  };

  window.utils.disableInputs();

  mainPin.addEventListener('mousedown', function (evt) {
    activateMap();
    addListenerToMainPin(evt);
  });
  mainPin.addEventListener('keydown', activateMap);

  window.map = {
    addressField: addressField,
    mapSection: mapSection,
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
    MAX_X_COORD: MAX_X_COORD,
    mainSection: mainSection,
    mapPins: mapPins,
    activateMap: activateMap,
    mainPin: mainPin,
    renderAdvertsOnMap: renderAdvertsOnMap,
    reloadPins: reloadPins
  };

})();
