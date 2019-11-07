'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status, 'upload', window.utils.errorMessageTemplate);
      }
    });

    xhr.open('POST', URL_UPLOAD);

    xhr.send(data);
  };
})();
