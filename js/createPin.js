'use strict';
(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createPin = function (advert) {

    var newPin = pinTemplate.cloneNode(true);
    newPin.querySelector('img').src = advert.autor.avatar;
    newPin.style.left = advert.location.x + 'px';
    newPin.style.top = advert.location.y + 'px';
    return newPin;
  };

  window.createPin = {
    createPin: createPin
  };
})();
