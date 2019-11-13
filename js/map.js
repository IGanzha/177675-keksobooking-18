'use strict';

(function () {

  var START_MAIN_PIN_COORD_X = 570;
  var START_MAIN_PIN_COORD_Y = 375;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var PIN_ARROWHEAD_HEIGHT = 22;
  var MIN_Y_POSITION = 130;
  var MAX_Y_POSITION = 630;
  var MIN_Y_COORD = MIN_Y_POSITION - PIN_ARROWHEAD_HEIGHT;
  var MAX_Y_COORD = MAX_Y_POSITION - PIN_ARROWHEAD_HEIGHT;
  var MIN_X_COORD = 0 - MAIN_PIN_WIDTH / 2;
  var PINS_LIMIT = 5;

  var mapSection = document.querySelector('.map');
  var maxXCoord = mapSection.getBoundingClientRect().width - MAIN_PIN_WIDTH / 2;
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');
  var mainSection = document.querySelector('main');
  var filterSelects = document.querySelectorAll('.map__filter');
  var filterForm = document.querySelector('.map__filters');


  var addListenerToAdvertPin = function (pinElement, advertElement) {
    pinElement.addEventListener('click', function () {
      var currentPinsOnMap = document.querySelectorAll('.map__pin--advert');
      currentPinsOnMap.forEach(function (currentPin) {
        currentPin.classList.remove('map-pin--active');
      });

      window.card.render(advertElement);
      pinElement.classList.add('map-pin--active');
    });
  };

  var renderAdvertsOnMap = function (allData) {
    window.pin.delete(mapPins.querySelectorAll('.map__pin--advert'));
    var unlimitedFilteredData = window.filter.filterData(allData);
    var adverts = window.filter.limitData(unlimitedFilteredData, PINS_LIMIT);
    adverts.forEach(function (advert) {
      var pin = window.pin.create(advert);
      pin.classList.add('map__pin--advert');
      fragment.appendChild(pin);
      addListenerToAdvertPin(pin, advert);
    });
    mapPins.appendChild(fragment);
  };

  var activateMap = function () {
    if (mapSection.classList.contains('map--faded')) {
      mapSection.classList.remove('map--faded');
      window.request(0, renderAdvertsOnMap, window.utils.errorHandler, window.utils.URL_LOAD, 'GET');

      filterSelects.forEach(function (select) {
        window.utils.enableElement(select);
      });
      mainPin.removeEventListener('keydown', onPinPressEnter);
    }

    filterForm.addEventListener('change', window.debounce(window.pin.reload));
  };

  var deactivateMap = function () {
    filterSelects.forEach(function (select) {
      window.utils.disableElement(select);
    });

    window.card.removeOpened();
    filterForm.reset();

    window.pin.delete(mapPins.querySelectorAll('.map__pin--advert'));
    mapSection.classList.add('map--faded');

    mainPin.style.top = START_MAIN_PIN_COORD_Y + 'px';
    mainPin.style.left = START_MAIN_PIN_COORD_X + 'px';

    mainPin.addEventListener('keydown', onPinPressEnter);
    filterForm.removeEventListener('change', window.debounce(window.pin.reload));
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
          if (element.offsetLeft - shift.x > maxXCoord) {
            coord = maxXCoord;
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
      mainPin.style.left = limitCoords(mainPin, MIN_X_COORD, maxXCoord, 'x') + 'px';

      window.form.addressField.value = Math.round(limitCoords(mainPin, MIN_X_COORD, maxXCoord, 'x') + MAIN_PIN_WIDTH / 2) + ', ' + (limitCoords(mainPin, MIN_Y_COORD, MAX_Y_COORD, 'y') + PIN_ARROWHEAD_HEIGHT);
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
      window.utils.activatePage();
    }
  };

  filterSelects.forEach(function (select) {
    window.utils.disableElement(select);
  });

  mainPin.addEventListener('mousedown', function (evt) {
    window.utils.activatePage();
    addListenerToMainPin(evt);
  });
  mainPin.addEventListener('keydown', window.utils.activatePage);

  window.map = {
    START_MAIN_PIN_COORD_X: START_MAIN_PIN_COORD_X,
    START_MAIN_PIN_COORD_Y: START_MAIN_PIN_COORD_Y,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    PIN_ARROWHEAD_HEIGHT: PIN_ARROWHEAD_HEIGHT,
    cityScheme: mapSection,
    mainSection: mainSection,
    renderAdverts: renderAdvertsOnMap,
    activate: activateMap,
    deactivate: deactivateMap
  };
})();
