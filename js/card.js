'use strict';
(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos').querySelector('img');
  var filterContainer = document.querySelector('.map__filters-container');
  var accommodationTypesToRus = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var featuresToRus = {
    'wifi': 'WiFi',
    'washer': 'Стиральная машина',
    'elevator': 'Лифт',
    'dishwasher': 'Посудомоечная машина',
    'parking': 'Паркинг',
    'conditioner': 'Кондиционер'
  };

  var getFeaturesInRus = function (featuresArray) {
    var featuresList = '';

    featuresArray.forEach(function (feature) {
      featuresList = featuresList + featuresToRus[feature] + ', ';
    });
    return featuresList;
  };

  var renderCard = function (advert) {
    removeOpenedAdCard();

    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__title').textContent = advert.offer.title;
    newCard.querySelector('.popup__text--address').textContent = advert.offer.adress;
    newCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = accommodationTypesToRus[advert.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнат(-а/-ы) для ' + advert.offer.guests + ' гостей(-я)';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout + '.';

    if (advert.offer.features) {
      newCard.querySelector('.popup__features').textContent = getFeaturesInRus(advert.offer.features);
    } else {
      newCard.querySelector('.popup__features').hidden = true;
    }

    if (advert.offer.description) {
      newCard.querySelector('.popup__description').textContent = advert.offer.description;
    } else {
      newCard.querySelector('.popup__description').hidden = true;
    }

    if (advert.offer.photos) {
      newCard.querySelector('.popup__photos').innerHTML = '';

      advert.offer.photos.forEach(function (photoSrc) {
        var newPhoto = photoTemplate.cloneNode(true);
        newPhoto.src = photoSrc;
        newCard.querySelector('.popup__photos').appendChild(newPhoto);
      });
    } else {
      newCard.querySelector('.popup__photos').hidden = true;
    }
    newCard.querySelector('.popup__avatar').src = advert.author.avatar;
    newCard.classList.add('opened-card');
    window.map.cityScheme.insertBefore(newCard, filterContainer);
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

  var removeOpenedAdCard = function () {
    if (window.map.cityScheme.querySelector('.opened-card')) {
      window.map.cityScheme.querySelector('.opened-card').remove();
    }
  };

  window.card = {
    render: renderCard,
    removeOpened: removeOpenedAdCard
  };

})();
