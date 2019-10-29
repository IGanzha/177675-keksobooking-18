'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var filterForm = document.querySelector('.map__filters');
  var mapFilterSelects = filterForm.querySelectorAll('.map__filter');
  var filterFeaturesCheckboxes = filterForm.querySelectorAll('.map__checkbox');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formFeaturesCheckboxes = document.querySelectorAll('.feature__checkbox');

  var disableInputs = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < mapFilterSelects.length; i++) {
      mapFilterSelects[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableInputs = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
    for (i = 0; i < mapFilterSelects.length; i++) {
      mapFilterSelects[i].removeAttribute('disabled');
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
    window.map.addressField.value = Math.round(window.map.START_MAIN_PIN_COORD_X + window.map.MAIN_PIN_WIDTH / 2) + ', ' + Math.round(window.map.START_MAIN_PIN_COORD_Y + window.map.MAIN_PIN_HEIGHT / 2);
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

    window.form.roomsAmountField.selectedIndex = 0;
    window.form.guestsAmountField.selectedIndex = 2;
    window.form.typeField.selectedIndex = 1;

    var pinsOnMap = window.map.mapPins.querySelectorAll('.map__pin--advert');
    for (i = 0; i < pinsOnMap.length; i++) {
      pinsOnMap[i].remove();
    }

    for (i = 0; i < mapFilterSelects.length; i++) {
      mapFilterSelects[i].removeEventListener('change', window.map.reloadPins);
    }

    for (i = 0; i < filterFeaturesCheckboxes.length; i++) {
      filterFeaturesCheckboxes[i].removeEventListener('change', window.map.reloadPins);
      filterFeaturesCheckboxes[i].removeEventListener('keydown', window.filter.onFilterAmenityCheckboxPressEnter);
    }

    window.preview.hidePreview(window.preview.avatarPreview, window.preview.AVATAR_SRC, 0);
    window.preview.hidePreview(window.preview.photoPreview, '', 1);

    window.form.form.classList.add('ad-form--disabled');

    window.form.titleField.removeEventListener('input', window.form.onTitleFieldInput);

    window.form.typeField.removeEventListener('change', window.form.onTypeFieldChange);

    window.form.timeInField.removeEventListener('change', window.form.onTimeInFieldChange);

    window.form.timeOutField.removeEventListener('change', window.form.onTimeOutFieldChange);

    window.form.roomsAmountField.removeEventListener('change', window.form.onRoomsAmountFieldChange);

    window.form.guestsAmountField.removeEventListener('change', window.form.onGuestsAmountFieldChange);

    window.form.form.removeEventListener('submit', window.form.onFormSubmit);

    window.form.resetButton.removeEventListener('click', window.form.onResetButtonClick);

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
    mapFilterSelects: mapFilterSelects,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    errorHandler: errorHandler,
    successHandler: successHandler,
    removeOpenedAdCard: removeOpenedAdCard,
    deactivatePage: deactivatePage,
    filterFeaturesCheckboxes: filterFeaturesCheckboxes,
    formFeaturesCheckboxes: formFeaturesCheckboxes
  };

})();
