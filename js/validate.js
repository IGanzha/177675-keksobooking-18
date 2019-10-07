'use strict';

(function () {

  var titleField = document.querySelector('#title');
  var priceField = document.querySelector('#price');
  var typeField = document.querySelector('#type');
  var timeInField = document.querySelector('#timein');
  var timeOutField = document.querySelector('#timeout');


  var validateTitleInput = function (titleElement) {
    titleElement.setAttribute('minlength', 30);
    titleElement.setAttribute('maxlength', 100);
  };

  var validatePriceInput = function (priceElement, type) {
    priceElement.removeAttribute('min');
    priceElement.setAttribute('required', 'required');
    priceElement.setAttribute('max', 1000000);
    priceElement.removeAttribute('placeholder');

    if (type.value === 'bungalo') {
      priceElement.setAttribute('min', 0);
      priceElement.setAttribute('placeholder', '0');
    } else if (type.value === 'flat') {
      priceElement.setAttribute('min', 1000);
      priceElement.setAttribute('placeholder', 1000);
    } else if (type.value === 'house') {
      priceElement.setAttribute('min', 5000);
      priceElement.setAttribute('placeholder', 5000);
    } else if (type.value === 'palace') {
      priceElement.setAttribute('min', 10000);
      priceElement.setAttribute('placeholder', 10000);
    }
  };

  var setTimeOutInput = function (timeInElement, timeOutElement) {
    for (var i = 0; i < timeOutElement.children.length; i++) {
      // timeOutElement.children[i].removeAttribute('selected');

      if (timeInElement.value === timeOutElement.children[i].value) {
        timeOutElement.selectedIndex = i;
      } else {
        timeOutElement.children[i].removeAttribute('selected');
      }
    }
  };

  var setTimeInInput = function (timeInElement, timeOutElement) {
    for (var i = 0; i < timeInElement.children.length; i++) {
      // timeInElement.children[i].removeAttribute('selected');

      if (timeOutElement.value === timeInElement.children[i].value) {
        timeInElement.selectedIndex = i;
      } else {
        timeInElement.children[i].removeAttribute('selected');
      }
    }
  };

  titleField.setAttribute('required', 'required');
  priceField.setAttribute('required', 'required');
  window.map.addressField.setAttribute('readonly', 'readonly');

  titleField.addEventListener('input', function () {
    validateTitleInput(titleField);
  });

  priceField.addEventListener('input', function () {
    validatePriceInput(priceField, typeField);
  });

  typeField.addEventListener('change', function () {
    validatePriceInput(priceField, typeField);
  });

  timeInField.addEventListener('change', function () {
    setTimeOutInput(timeInField, timeOutField);
  });

  timeOutField.addEventListener('change', function () {
    setTimeInInput(timeInField, timeOutField);
  });


  // -------------ОГРАНИЧЕНИЕ НА ВВОД ПОЛЕЙ  -------
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var validateRoomsAndGuestsSelects = function (roomsSelect, guestsSelect) {

    var guestsAmountOptions = guestsSelect.children;
    for (var i = 0; i < guestsAmountOptions.length; i++) {
      guestsAmountOptions[i].removeAttribute('disabled');

      // ------- блокирую, если количество гостей больше, чем комнат
      if (guestsAmountOptions[i].value > roomsSelect.value) {
        guestsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      // ------- блокирую все варианты гостей, кроме "не для гостей", если очень много комнат - условно ввел MAX_ROOMS_AVAILABLE = 5 - сюда будет попадать "100 комнат".
      if ((roomsSelect.value > window.createMocks.MAX_ROOMS_AVAILABLE) && (guestsAmountOptions[i].value > 0)) {
        guestsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      // блокирую вариант "не для гостей", если количество комнат не превышает допустимое MAX_ROOMS_AVAILABLE
      if ((roomsSelect.value < window.createMocks.MAX_ROOMS_AVAILABLE) && (guestsAmountOptions[i].value < 1)) {
        guestsAmountOptions[i].setAttribute('disabled', 'disabled');
      }
    }

    // --------- ОБРАТНАЯ БЛОКИРОВКА - ------
    var roomsAmountOptions = roomsSelect.children;
    for (i = 0; i < roomsAmountOptions.length; i++) {
      roomsAmountOptions[i].removeAttribute('disabled');

      // блокирую, если количество комнат меньше, чем количество гостей
      if (roomsAmountOptions[i].value < guestsSelect.value) {
        roomsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      // блокирую все варианты количества комнат, кроме 100, если выбран вариант "не для гостей"
      if ((guestsSelect.value < 1) && (roomsAmountOptions[i].value < window.createMocks.MAX_ROOMS_AVAILABLE)) {
        roomsAmountOptions[i].setAttribute('disabled', 'disabled');
      }

      // блокирую "100 комнат", если выбран 1 гость
      if ((+guestsSelect.value === 1) && (roomsAmountOptions[i].value > window.createMocks.MAX_ROOMS_AVAILABLE)) {
        roomsAmountOptions[i].setAttribute('disabled', 'disabled');
      }
    }

    // разблокировываю селек с комнатами, если выбраны "100 комнат"" и "не для гостей"
    if ((+roomNumber.value === 100) && (+capacity.value === 0)) {
      for (i = 0; i < roomsAmountOptions.length; i++) {
        roomsAmountOptions[i].removeAttribute('disabled');
      }
    }
  };

  roomNumber.addEventListener('change', function () {
    validateRoomsAndGuestsSelects(roomNumber, capacity);
  });

  capacity.addEventListener('change', function () {
    validateRoomsAndGuestsSelects(roomNumber, capacity);
  });

})();
