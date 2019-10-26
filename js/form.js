'use strict';

(function () {

  var MAX_ROOMS_AVAILABLE = 5;
  var titleField = document.querySelector('#title');
  var priceField = document.querySelector('#price');
  var typeField = document.querySelector('#type');
  var timeInField = document.querySelector('#timein');
  var timeOutField = document.querySelector('#timeout');
  var roomsAmountField = document.querySelector('#room_number');
  var guestsAmountField = document.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
  var descField = document.querySelector('#description');
  var resetButton = document.querySelector('.ad-form__reset');

  var validateTitleInput = function (titleElement) {
    titleElement.setAttribute('minlength', 30);
    titleElement.setAttribute('maxlength', 100);
  };

  var setPlaceholderAndMinValue = function (element, placeholderValue, minValue) {
    element.setAttribute('placeholder', placeholderValue);
    element.setAttribute('min', minValue);
  };

  var validatePriceInput = function (priceElement, type) {
    priceElement.removeAttribute('min');
    priceElement.removeAttribute('placeholder');

    if (type.value === 'bungalo') {
      setPlaceholderAndMinValue(priceElement, 0, 0);
    } else if (type.value === 'flat') {
      setPlaceholderAndMinValue(priceElement, 1000, 1000);
    } else if (type.value === 'house') {
      setPlaceholderAndMinValue(priceElement, 5000, 5000);
    } else if (type.value === 'palace') {
      setPlaceholderAndMinValue(priceElement, 10000, 10000);
    }
  };

  var setTimeOutInput = function (timeInElement, timeOutElement) {
    for (var i = 0; i < timeOutElement.children.length; i++) {
      if (timeInElement.value === timeOutElement.children[i].value) {
        timeOutElement.selectedIndex = i;
      } else {
        timeOutElement.children[i].removeAttribute('selected');
      }
    }
  };

  var setTimeInInput = function (timeInElement, timeOutElement) {
    for (var i = 0; i < timeInElement.children.length; i++) {
      if (timeOutElement.value === timeInElement.children[i].value) {
        timeInElement.selectedIndex = i;
      } else {
        (timeInElement.children[i].removeAttribute('selected'));
      }
    }
  };

  var onTitleFieldInput = function () {
    validateTitleInput(titleField);
  };

  var onTypeFieldChange = function () {
    validatePriceInput(priceField, typeField);
  };

  var onTimeInFieldChange = function () {
    setTimeOutInput(timeInField, timeOutField);
  };

  var onTimeOutFieldChange = function () {
    setTimeInInput(timeInField, timeOutField);
  };

  var limitGuestsSelect = function (roomsSelect, guestsSelect) {

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

    if ((+roomsSelect.value === 100) && (+guestsSelect.value === 0)) {
      for (i = 0; i < guestsAmountOptions.length; i++) {
        guestsAmountOptions[i].removeAttribute('disabled');
      }
    }
  };

  var limitRoomsSelect = function (roomsSelect, guestsSelect) {
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

    if ((+roomsSelect.value === 100) && (+guestsSelect.value === 0)) {
      for (i = 0; i < roomsAmountOptions.length; i++) {
        roomsAmountOptions[i].removeAttribute('disabled');
      }
    }
  };

  var onRoomsAmountFieldChange = function () {
    limitGuestsSelect(roomsAmountField, guestsAmountField);
  };

  var onGuestsAmountFieldChange = function () {
    limitRoomsSelect(roomsAmountField, guestsAmountField);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), window.utils.successHandler, window.utils.errorHandler);
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    window.utils.deactivatePage();
  };

  window.map.addressField.value = (window.map.START_MAIN_PIN_COORD_X + window.map.MAIN_PIN_WIDTH / 2) + ', ' + (window.map.START_MAIN_PIN_COORD_Y + window.map.MAIN_PIN_HEIGHT / 2);

  window.form = {
    form: form,
    titleField: titleField,
    typeField: typeField,
    priceField: priceField,
    descField: descField,
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
    resetButton: resetButton
  };

})();
