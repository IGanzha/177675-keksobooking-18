'use strict';

(function () {

  var LOW_PRICE_TOP = 10000;
  var HIGH_PRICE_BOTTOM = 50000;
  var typeFilterField = document.querySelector('#housing-type');
  var priceFilterField = document.querySelector('#housing-price');
  var roomsFilterField = document.querySelector('#housing-rooms');
  var guestsFilterField = document.querySelector('#housing-guests');


  var limitData = function (data, limit) {
    var limitedData = data.slice(0, limit);
    return limitedData;
  };

  var filterData = function (data) {
    var filteredData = data.filter(function (dataElement) {
      return getTypeCondition(typeFilterField, dataElement) && getPriceCondition(priceFilterField, dataElement, LOW_PRICE_TOP, HIGH_PRICE_BOTTOM) && getRoomsCondition(roomsFilterField, dataElement) && getGuestsCondition(guestsFilterField, dataElement) && getFeaturesCondition(dataElement);
    });
    return filteredData;
  };

  var getTypeCondition = function (typeField, element) {
    if (typeField.value === 'any') {
      return true;
    } else {
      return element.offer.type === typeField.value;
    }
  };

  var getPriceCondition = function (priceField, element, topOfLowPrice, bottomOfHighPrice) {
    if (priceField.value === 'any') {
      var result = true;
    } else if (priceField.value === 'low') {
      result = element.offer.price < topOfLowPrice;
    } else if (priceField.value === 'high') {
      result = element.offer.price > bottomOfHighPrice;
    } else if (priceFilterField.value === 'middle') {
      result = ((element.offer.price <= bottomOfHighPrice) && (element.offer.price >= topOfLowPrice));
    }
    return result;
  };

  var getRoomsCondition = function (roomsField, element) {
    if (roomsField.value === 'any') {
      return true;
    } else {
      return element.offer.rooms === +roomsField.value;
    }
  };

  var getGuestsCondition = function (guestsField, element) {
    if (guestsField.value === 'any') {
      return true;
    } else {
      return element.offer.guests === +guestsField.value;
    }
  };

  var getFeaturesCondition = function (element) {
    var checkedCheckboxes = document.querySelectorAll('.map__checkbox:checked');

    if (checkedCheckboxes.length > 0) {
      var checkedFeaturesArray = Array.from(checkedCheckboxes).map(function (checkedElement) {
        return checkedElement.value;
      });
      return checkedFeaturesArray.every(function (featuresElement) {
        return element.offer.features.includes(featuresElement);
      });
    } else {
      return true;
    }
  };

  window.filter = {
    limitData: limitData,
    filterData: filterData,
  };
})();
