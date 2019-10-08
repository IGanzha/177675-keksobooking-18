'use strict';
(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos').querySelector('img');
  var filterContainer = document.querySelector('.map__filters-container');

  var renderCard = function (advert) {
    if (window.utils.mapSection.querySelector('.opened-card')) {
      window.utils.mapSection.querySelector('.opened-card').remove();
    }

    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__title').textContent = advert.offer.title;
    newCard.querySelector('.popup__text--address').textContent = advert.offer.adress;
    newCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = window.data.AccommodationTypesRus[advert.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнат(-а/-ы) для ' + advert.offer.guests + ' гостей(-я)';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout + '.';
    newCard.querySelector('.popup__features').textContent = advert.offer.features;
    newCard.querySelector('.popup__description').textContent = advert.offer.description;
    newCard.querySelector('.popup__photos').innerHTML = '';

    for (var j = 0; j < advert.offer.photos.length; j++) {
      var newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = advert.offer.photos[j];
      newCard.querySelector('.popup__photos').appendChild(newPhoto);
    }
    newCard.querySelector('.popup__avatar').src = advert.autor.avatar;
    newCard.classList.add('opened-card');
    window.utils.mapSection.insertBefore(newCard, filterContainer);
    var popupButtonClose = newCard.querySelector('.popup__close');

    popupButtonClose.addEventListener('click', function () {
      newCard.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        newCard.remove();
      }
    });
  };

  window.renderCard = {
    renderCard: renderCard
  };

})();
