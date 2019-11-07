'use strict';

(function () {

  window.request = function (data, onSuccess, onError, URL, method) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open(method, URL);

    xhr.addEventListener('load', function () {

      if (xhr.status === +window.utils.SUCCESS_CODE) {
        onSuccess(xhr.response);

        if (method === 'GET') {
          window.originalData = xhr.response;
        }
      } else {
        if (method === 'GET') {
          onError('Ошибка: ' + xhr.status, 'load', window.utils.errorMessageTemplate);
        } else if (method === 'POST') {
          onError('Ошибка: ' + xhr.status, 'upload', window.utils.errorMessageTemplate);
        }
      }
    });

    xhr.send(data);
  };
})();
