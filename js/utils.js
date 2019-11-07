'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var URL_UPLOAD = 'https://js.dump.academy/keksobooвking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var SUCCESS_CODE = 200;


  var filterForm = document.querySelector('.map__filters');
  var formFieldsets = document.querySelectorAll('fieldset');
  var filterSelects = document.querySelectorAll('.map__filter');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var disableElement = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var enableElement = function (element) {
    element.removeAttribute('disabled');
  };

  var activatePage = function () {
    window.adForm.enableForm();
    window.map.activate();
  };

  var deactivatePage = function () {
    window.adForm.disableForm();
    window.map.deactivate();
  };

  var errorHandler = function (errorMessage, toDo, messageTemplate) {

    var newError = messageTemplate.cloneNode(true);
    newError.querySelector('.error__message').textContent = errorMessage;
    newError.classList.add('result-message');

    newError.addEventListener('click', onResultMessageClick);
    window.addEventListener('keydown', onResultMessagePressEsc);

    var tryingAgainButton = newError.querySelector('.error__button');
    tryingAgainButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      newError.removeEventListener('click', onResultMessageClick);
      newError.remove();
      if (toDo === 'load') {
        window.request(0, window.map.renderAdverts, errorHandler, URL_LOAD, 'GET');
      } else if (toDo === 'upload') {
        window.request(new FormData(window.adForm.form), successHandler, errorHandler, URL_UPLOAD, 'POST');
      }
    });

    window.map.mainSection.insertAdjacentElement('afterbegin', newError);
  };

  var onResultMessageClick = function () {
    var resultMessage = document.querySelector('.result-message');
    resultMessage.removeEventListener('click', onResultMessageClick);
    window.removeEventListener('keydown', onResultMessagePressEsc);
    resultMessage.remove();
  };

  var onResultMessagePressEsc = function (messageEvt) {
    if (messageEvt.keyCode === ESC_KEYCODE) {
      window.removeEventListener('keydown', onResultMessagePressEsc);
      var resultMessage = document.querySelector('.result-message');
      resultMessage.removeEventListener('click', onResultMessageClick);
      resultMessage.remove();
    }
  };

  var successHandler = function () {
    deactivatePage();

    var newSuccessMessage = successMessageTemplate.cloneNode(true);
    newSuccessMessage.classList.add('result-message');
    window.map.mainSection.insertAdjacentElement('afterbegin', newSuccessMessage);

    newSuccessMessage.addEventListener('click', onResultMessageClick);
    window.addEventListener('keydown', onResultMessagePressEsc);
  };

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    formFieldsets: formFieldsets,
    errorHandler: errorHandler,
    successHandler: successHandler,
    deactivatePage: deactivatePage,
    filterSelects: filterSelects,
    disableElement: disableElement,
    activatePage: activatePage,
    enableElement: enableElement,
    filterForm: filterForm,
    successMessageTemplate: successMessageTemplate,
    errorMessageTemplate: errorMessageTemplate,
    URL_UPLOAD: URL_UPLOAD,
    URL_LOAD: URL_LOAD,
    SUCCESS_CODE: SUCCESS_CODE
  };

})();
