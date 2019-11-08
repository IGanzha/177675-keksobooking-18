'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var disableElement = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var enableElement = function (element) {
    element.removeAttribute('disabled');
  };

  var activatePage = function () {
    window.form.enable();
    window.map.activate();
  };

  var deactivatePage = function () {
    window.form.disable();
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
      newError.removeEventListener('click', onResultMessageClick);
      window.removeEventListener('keydown', onResultMessagePressEsc);
      newError.remove();
      if (toDo === 'load') {
        window.request(0, window.map.renderAdverts, errorHandler, URL_LOAD, 'GET');
      } else if (toDo === 'upload') {
        window.request(new FormData(window.form.newAdvert), successHandler, errorHandler, URL_UPLOAD, 'POST');
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
    errorHandler: errorHandler,
    successHandler: successHandler,
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    enableElement: enableElement,
    disableElement: disableElement,
    errorMessageTemplate: errorMessageTemplate,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD
  };

})();
