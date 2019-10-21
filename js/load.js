'use strict';
(function () {

  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', window.utils.URL_LOAD);

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
        window.nativeData = xhr.response;

      } else {
        onError('Ошибка: ' + xhr.status + ', Текст ошибки: ' + xhr.statusText, 'load');
      }
    });

    xhr.send();
  };

  window.load = {
    load: load
  };
})();
