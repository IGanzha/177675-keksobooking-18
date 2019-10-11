'use strict';
(function () {

  var URL = 'https://js.dump.academy/keksobooking/dasta';

  window.load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ошибки: ' + xhr.status + ', Текст ошибки: ' + xhr.statusText);
      }
    });

    xhr.send();
  };
})();
