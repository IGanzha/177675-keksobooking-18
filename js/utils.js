'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var mapSection = document.querySelector('.map');
  var formFieldsets = document.querySelectorAll('fieldset');
  var mapFilterInputs = document.querySelector('.map__filters').querySelectorAll('select');
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekdsobooking';


  var disableInputs = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < mapFilterInputs.length; i++) {
      mapFilterInputs[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableInputs = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
    for (i = 0; i < mapFilterInputs.length; i++) {
      mapFilterInputs[i].removeAttribute('disabled');
    }
  };

  var removeOpenedAdCard = function () {
    if (mapSection.querySelector('.opened-card')) {
      mapSection.querySelector('.opened-card').remove();
    }
  };

  var deactivatePage = function () {
    disableInputs();
    removeOpenedAdCard();
    window.map.mainPin.style.top = window.map.START_MAIN_PIN_COORD_Y + 'px';
    window.map.mainPin.style.left = window.map.START_MAIN_PIN_COORD_X + 'px';
    window.map.addressField.value = (window.map.START_MAIN_PIN_COORD_X + window.map.MAIN_PIN_WIDTH / 2) + ', ' + (window.map.START_MAIN_PIN_COORD_Y + window.map.MAIN_PIN_HEIGHT / 2);
    window.utils.mapSection.classList.add('map--faded');
    window.form.titleField.value = '';
    window.form.priceField.value = '';
    window.form.descField.value = '';
    var pinsOnMap = window.map.mapPins.querySelectorAll('.map__pin--advert');
    for (var i = 0; i < pinsOnMap.length; i++) {
      pinsOnMap[i].remove();
    }
    window.form.form.classList.add('ad-form--disabled');
  };

  var errorHandler = function (errorMessage, toDo) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__message').textContent = errorMessage;
    newError.classList.add('result-message');

    var tryingAgainButton = newError.querySelector('.error__button');
    tryingAgainButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      newError.remove();
      if (toDo === 'load') {
        window.load(window.map.renderAdvertsOnMap, errorHandler);
      } else if (toDo === 'upload') {
        window.upload(new FormData(window.form.form), successHandler, errorHandler);
      }
    });

    window.map.mainSection.insertAdjacentElement('afterbegin', newError);

    newError.addEventListener('click', onResultMessageClick);
    window.addEventListener('keydown', onResultMessagePressEsc);
  };

  var onResultMessageClick = function (messageEvt) {
    messageEvt.target.removeEventListener('click', onResultMessageClick);
    messageEvt.target.remove();
  };

  var onResultMessagePressEsc = function (messageEvt) {
    if (messageEvt.keyCode === ESC_KEYCODE) {
      window.removeEventListener('keydown', onResultMessagePressEsc);
      document.querySelector('.result-message').remove();
    }
  };

  var successHandler = function () {
    deactivatePage();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var newSuccessMessage = successMessageTemplate.cloneNode(true);
    newSuccessMessage.classList.add('result-message');
    window.map.mainSection.insertAdjacentElement('afterbegin', newSuccessMessage);

    newSuccessMessage.addEventListener('click', onResultMessageClick);
    window.addEventListener('keydown', onResultMessagePressEsc);
  };

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    mapSection: mapSection,
    enableInputs: enableInputs,
    disableInputs: disableInputs,
    formFieldsets: formFieldsets,
    mapFilterInputs: mapFilterInputs,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    errorHandler: errorHandler,
    successHandler: successHandler
  };

})();
