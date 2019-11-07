'use strict';

(function () {

  var MAX_ROOMS_AVAILABLE = 5;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var titleField = document.querySelector('#title');
  var priceField = document.querySelector('#price');
  var typeField = document.querySelector('#type');
  var timeInField = document.querySelector('#timein');
  var timeOutField = document.querySelector('#timeout');
  var roomsAmountField = document.querySelector('#room_number');
  var guestsAmountField = document.querySelector('#capacity');
  var addressField = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  var formFieldsets = document.querySelectorAll('fieldset');

  var enableForm = function () {
    if (window.map.cityScheme.classList.contains('map--faded')) {
      form.classList.remove('ad-form--disabled');

      formFieldsets.forEach(function (fieldset) {
        fieldset.removeAttribute('disabled');
      });

      addressField.value = Math.round(window.map.START_MAIN_PIN_COORD_X + window.map.MAIN_PIN_WIDTH / 2) + ', ' + (window.map.START_MAIN_PIN_COORD_Y + window.map.MAIN_PIN_HEIGHT + window.map.PIN_ARROWHEAD_HEIGHT);
    }

    titleField.addEventListener('input', onTitleFieldInput);

    typeField.addEventListener('change', onTypeFieldChange);

    timeInField.addEventListener('change', onTimeInFieldChange);

    timeOutField.addEventListener('change', onTimeOutFieldChange);

    roomsAmountField.addEventListener('change', onRoomsAmountFieldChange);

    guestsAmountField.addEventListener('change', onGuestsAmountFieldChange);

    form.addEventListener('submit', onFormSubmit);

    resetButton.addEventListener('click', onResetButtonClick);
  };

  var disableForm = function () {

    if (!form.classList.contains('ad-form--disabled')) {

      formFieldsets.forEach(function (fieldset) {
        fieldset.setAttribute('disabled', 'disabled');
      });

      form.reset();

      form.classList.add('ad-form--disabled');

      titleField.removeEventListener('input', onTitleFieldInput);

      typeField.removeEventListener('change', onTypeFieldChange);

      timeInField.removeEventListener('change', onTimeInFieldChange);

      timeOutField.removeEventListener('change', onTimeOutFieldChange);

      roomsAmountField.removeEventListener('change', onRoomsAmountFieldChange);

      guestsAmountField.removeEventListener('change', onGuestsAmountFieldChange);

      form.removeEventListener('submit', onFormSubmit);

      resetButton.removeEventListener('click', onResetButtonClick);

      window.preview.hidePreview(window.preview.avatarPreview, window.preview.AVATAR_SRC, 0);
      window.preview.hidePreview(window.preview.photoPreview, '', 1);
    }
  };


  var validateTitleInput = function (titleElement, minLength, maxLength) {
    titleElement.setAttribute('minlength', minLength);
    titleElement.setAttribute('maxlength', maxLength);
  };

  var setPlaceholderAndMinValue = function (element, placeholderValue, minValue) {
    element.setAttribute('placeholder', placeholderValue);
    element.setAttribute('min', minValue);
  };

  var validatePriceInput = function (priceElement, typeElement) {
    priceElement.removeAttribute('min');
    priceElement.removeAttribute('placeholder');

    if (typeElement.value === 'bungalo') {
      setPlaceholderAndMinValue(priceElement, BUNGALO_MIN_PRICE, BUNGALO_MIN_PRICE);
    } else if (typeElement.value === 'flat') {
      setPlaceholderAndMinValue(priceElement, FLAT_MIN_PRICE, FLAT_MIN_PRICE);
    } else if (typeElement.value === 'house') {
      setPlaceholderAndMinValue(priceElement, HOUSE_MIN_PRICE, HOUSE_MIN_PRICE);
    } else if (typeElement.value === 'palace') {
      setPlaceholderAndMinValue(priceElement, PALACE_MIN_PRICE, PALACE_MIN_PRICE);
    }
  };

  var setTimeInput = function (timeElementFrom, timeElementTo) {
    timeElementTo.value = timeElementFrom.value;
  };

  var limitGuestsSelect = function (roomsSelect, guestsSelect) {
    roomsSelect.setCustomValidity('');
    if ((roomsSelect.value < guestsSelect.value) || ((roomsSelect.value > MAX_ROOMS_AVAILABLE) && (guestsSelect.value > 0)) || ((roomsSelect.value < MAX_ROOMS_AVAILABLE) && (guestsSelect.value < 1))) {
      guestsSelect.setCustomValidity('Количество гостей не может быть больше кол-ва комнат. Вариант брони "100 комнат" предназначен не для гостей.');
    } else {
      guestsSelect.setCustomValidity('');
    }

    var guestsAmountOptions = guestsSelect.children;
    for (var i = 0; i < guestsAmountOptions.length; i++) {
      guestsAmountOptions[i].removeAttribute('disabled');

      if (guestsAmountOptions[i].value > roomsSelect.value) {
        guestsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      if ((roomsSelect.value > MAX_ROOMS_AVAILABLE) && (guestsAmountOptions[i].value > 0)) {
        guestsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      if ((roomsSelect.value < MAX_ROOMS_AVAILABLE) && (guestsAmountOptions[i].value < 1)) {
        guestsAmountOptions[i].setAttribute('disabled', 'disabled');
      }
    }

    if ((+roomsSelect.value > MAX_ROOMS_AVAILABLE) && (+guestsSelect.value === 0)) {
      guestsSelect.setCustomValidity('');
      for (i = 0; i < guestsAmountOptions.length; i++) {
        guestsAmountOptions[i].removeAttribute('disabled');
      }
    }
  };

  var limitRoomsSelect = function (roomsSelect, guestsSelect) {
    guestsSelect.setCustomValidity('');

    if ((roomsSelect.value < guestsSelect.value) || ((guestsSelect.value < 1) && (roomsSelect.value < MAX_ROOMS_AVAILABLE)) || ((guestsSelect.value > 0) && (roomsSelect.value > MAX_ROOMS_AVAILABLE))) {
      roomsSelect.setCustomValidity('Количество гостей не может быть больше кол-ва комнат. Вариант "не для гостей" доступен только при брони 100 комнат.');
    } else {
      roomsSelect.setCustomValidity('');
    }

    var roomsAmountOptions = roomsSelect.children;
    for (var i = 0; i < roomsAmountOptions.length; i++) {
      roomsAmountOptions[i].removeAttribute('disabled');

      if (roomsAmountOptions[i].value < guestsSelect.value) {
        roomsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      if ((guestsSelect.value < 1) && (roomsAmountOptions[i].value < MAX_ROOMS_AVAILABLE)) {
        roomsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      if ((+guestsSelect.value === 1) && (roomsAmountOptions[i].value > MAX_ROOMS_AVAILABLE)) {
        roomsAmountOptions[i].setAttribute('disabled', 'disabled');
      }
    }

    if ((+roomsSelect.value > MAX_ROOMS_AVAILABLE) && (+guestsSelect.value === 0)) {
      roomsSelect.setCustomValidity('');
      for (i = 0; i < roomsAmountOptions.length; i++) {
        roomsAmountOptions[i].removeAttribute('disabled');
      }
    }
  };

  var onTitleFieldInput = function () {
    validateTitleInput(titleField, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
  };

  var onTypeFieldChange = function () {
    validatePriceInput(priceField, typeField);
  };

  var onTimeInFieldChange = function () {
    setTimeInput(timeInField, timeOutField);
  };

  var onTimeOutFieldChange = function () {
    setTimeInput(timeOutField, timeInField);
  };

  var onRoomsAmountFieldChange = function () {
    limitGuestsSelect(roomsAmountField, guestsAmountField);
  };

  var onGuestsAmountFieldChange = function () {
    limitRoomsSelect(roomsAmountField, guestsAmountField);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    // window.upload(new FormData(form), window.utils.successHandler, window.utils.errorHandler);
    window.request(new FormData(form), window.utils.successHandler, window.utils.errorHandler, window.utils.URL_UPLOAD, 'POST');
    limitGuestsSelect(roomsAmountField, guestsAmountField);
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    window.utils.deactivatePage();
  };

  addressField.value = Math.round(window.map.START_MAIN_PIN_COORD_X + window.map.MAIN_PIN_WIDTH / 2) + ', ' + Math.round(window.map.START_MAIN_PIN_COORD_Y + window.map.MAIN_PIN_HEIGHT / 2);

  disableForm();

  window.adForm = {
    form: form,
    titleField: titleField,
    typeField: typeField,
    priceField: priceField,
    timeInField: timeInField,
    timeOutField: timeOutField,
    roomsAmountField: roomsAmountField,
    guestsAmountField: guestsAmountField,
    onTitleFieldInput: onTitleFieldInput,
    onTypeFieldChange: onTypeFieldChange,
    onTimeInFieldChange: onTimeInFieldChange,
    onTimeOutFieldChange: onTimeOutFieldChange,
    onRoomsAmountFieldChange: onRoomsAmountFieldChange,
    onGuestsAmountFieldChange: onGuestsAmountFieldChange,
    onFormSubmit: onFormSubmit,
    onResetButtonClick: onResetButtonClick,
    resetButton: resetButton,
    enableForm: enableForm,
    disableForm: disableForm,
    addressField: addressField
  };

})();
