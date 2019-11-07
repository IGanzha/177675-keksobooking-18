'use strict';
(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createPin = function (advert) {

    var newPin = pinTemplate.cloneNode(true);
    newPin.querySelector('img').src = advert.author.avatar;
    newPin.style.left = advert.location.x + 'px';
    newPin.style.top = advert.location.y + 'px';
    return newPin;
  };

  var reloadPins = function () {
    window.card.removeOpenedAdCard();
    window.map.renderAdverts(window.originalData);
  };

  var deletePins = function (pins) {
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    create: createPin,
    reload: reloadPins,
    delete: deletePins
  };
})();
