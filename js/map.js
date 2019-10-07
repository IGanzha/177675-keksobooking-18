'use strict';

(function () {

  var ADVERTS_AMOUNT = 8;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filterContainer = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');

  var createPin = function (advert) {

    var newPin = pinTemplate.cloneNode(true);
    newPin.querySelector('img').src = advert.autor.avatar;
    newPin.style.left = advert.location.x + 'px';
    newPin.style.top = advert.location.y + 'px';
    return newPin;
  };

  var renderCard = function (advert) {
    if (window.util.map.querySelector('.opened-card')) {
      window.util.map.querySelector('.opened-card').remove();
    }

    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__title').textContent = advert.offer.title;
    newCard.querySelector('.popup__text--address').textContent = advert.offer.adress;

    newCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = window.createMocks.AccommodationTypesRus[advert.offer.type];
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
    newCard.classList.add('opened-card');
    window.util.map.insertBefore(newCard, filterContainer);

    var popupButtonClose = newCard.querySelector('.popup__close');

    popupButtonClose.addEventListener('click', function () {
      newCard.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        newCard.remove();
      }
    });
  };

  var renderAdvertsOnMap = function () {
    var adverts = window.createAdvertsArray(ADVERTS_AMOUNT);
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
  addressField.value = (window.createMocks.START_MAIN_PIN_COORD_X + window.createMocks.MAIN_PIN_WIDTH / 2) + ', ' + (window.createMocks.START_MAIN_PIN_COORD_Y + window.createMocks.MAIN_PIN_HEIGHT / 2);


  var activateMap = function () {
    window.util.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderAdvertsOnMap();

    for (i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }

    for (i = 0; i < mapFilterInputs.length; i++) {
      mapFilterInputs[i].removeAttribute('disabled');
    }

    // -----------меняю значение в поле адрес - определяю их по концу метки
    addressField.value = (window.createMocks.START_MAIN_PIN_COORD_X + window.createMocks.MAIN_PIN_WIDTH / 2) + ', ' + (window.createMocks.START_MAIN_PIN_COORD_Y + window.createMocks.MAIN_PIN_HEIGHT + window.createMocks.PIN_ARROWHEAD_HEIGHT);
    // ---------- удаляю обработчики
    mainPin.removeEventListener('mousedown', activateMap);
    mainPin.removeEventListener('keydown', onPinPressEnter);
  };

  var onPinPressEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  };

  mainPin.addEventListener('mousedown', activateMap);
  mainPin.addEventListener('keydown', onPinPressEnter);

  mainPin.addEventListener('mousemove', function (evt) {
    addressField.value = evt.pageX + ', ' + (evt.pageY + (window.createMocks.MAIN_PIN_HEIGHT / 2) + window.createMocks.PIN_ARROWHEAD_HEIGHT);
  });

  window.map = {
    addressField: addressField
  };

})();
