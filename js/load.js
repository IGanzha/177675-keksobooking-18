'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  window.load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
        window.originalData = xhr.response;

      } else {
        onError('Ошибка: ' + xhr.status, 'load', window.utils.errorMessageTemplate);
      }
    });

    xhr.send();
  };

})();
