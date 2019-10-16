'use strict';
(function () {

  // var nativeData = [];

  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', window.utils.URL_LOAD);

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
        window.nativeData = xhr.response;
        // console.log('данные загружены');
        // console.log(nativeData);
      } else {
        onError('Ошибка: ' + xhr.status + ', Текст ошибки: ' + xhr.statusText, 'load');
      }
    });

    xhr.send();
  };

  // console.log(nativeData);
  window.load = {
    load: load
    // nativeData: nativeData
  };
})();
