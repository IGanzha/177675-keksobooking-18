'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterInputs = mapFilters.querySelectorAll('select');
  var filterSelects = mapFilters.querySelectorAll('.map__filter');
  var featuresCheckboxes = mapFilters.querySelectorAll('.map__checkbox');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formFeaturesCheckboxes = document.querySelectorAll('.feature__checkbox');

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
    if (window.map.mapSection.querySelector('.opened-card')) {
      window.map.mapSection.querySelector('.opened-card').remove();
    }
  };

  var deactivatePage = function () {
    disableInputs();
    removeOpenedAdCard();
    window.map.mainPin.style.top = window.map.START_MAIN_PIN_COORD_Y + 'px';
    window.map.mainPin.style.left = window.map.START_MAIN_PIN_COORD_X + 'px';
    window.map.addressField.value = (window.map.START_MAIN_PIN_COORD_X + window.map.MAIN_PIN_WIDTH / 2) + ', ' + (window.map.START_MAIN_PIN_COORD_Y + window.map.MAIN_PIN_HEIGHT / 2);
    window.map.mapSection.classList.add('map--faded');


    window.filter.typeFilterField.selectedIndex = 0;
    window.filter.priceFilterField.selectedIndex = 0;
    window.filter.roomsFilterField.selectedIndex = 0;
    window.filter.guestsFilterField.selectedIndex = 0;

    window.form.titleField.value = '';
    window.form.priceField.value = '';
    window.form.descField.value = '';

    for (var i = 0; i < formFeaturesCheckboxes.length; i++) {
      formFeaturesCheckboxes[i].checked = false;
    }

    window.form.timeInField.selectedIndex = 0;
    window.form.timeOutField.selectedIndex = 0;

    window.form.roomNumber.selectedIndex = 0;
    window.form.capacity.selectedIndex = 2;
    window.form.typeField.selectedIndex = 1;

    var pinsOnMap = window.map.mapPins.querySelectorAll('.map__pin--advert');
    for (i = 0; i < pinsOnMap.length; i++) {
      pinsOnMap[i].remove();
    }

    for (i = 0; i < filterSelects.length; i++) {
      filterSelects[i].removeEventListener('change', window.map.reloadPins);
    }

    for (i = 0; i < featuresCheckboxes.length; i++) {
      featuresCheckboxes[i].removeEventListener('change', window.map.reloadPins);
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
    enableInputs: enableInputs,
    disableInputs: disableInputs,
    formFieldsets: formFieldsets,
    mapFilterInputs: mapFilterInputs,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    errorHandler: errorHandler,
    successHandler: successHandler,
    removeOpenedAdCard: removeOpenedAdCard,
    deactivatePage: deactivatePage,
    filterSelects: filterSelects,
    featuresCheckboxes: featuresCheckboxes
  };

})();
