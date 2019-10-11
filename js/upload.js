'use strict';

(function () {

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status, 'upload');
      }
    });

    xhr.open('POST', window.utils.URL_UPLOAD);

    xhr.send(data);
  };
})();
