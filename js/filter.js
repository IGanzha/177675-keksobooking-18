'use strict';

(function () {

  var typeFilterField = document.querySelector('#housing-type');
  var priceFilterField = document.querySelector('#housing-price');
  var roomsFilterField = document.querySelector('#housing-rooms');
  var guestsFilterField = document.querySelector('#housing-guests');
  var wifiCheckbox = document.querySelector('#filter-wifi');
  var dishwasherCheckbox = document.querySelector('#filter-dishwasher');
  var parkingCheckbox = document.querySelector('#filter-parking');
  var washerCheckbox = document.querySelector('#filter-washer');
  var elevatorCheckbox = document.querySelector('#filter-elevator');
  var conditionerCheckbox = document.querySelector('#filter-conditioner');

  var LOW_PRICE_TOP = 10000;
  var HIGH_PRICE_BOTTOM = 50000;

  var limitData = function (data, limit) {
    var limitedData = data.slice(0, limit);
    // здесь ноль является магическим числом?
    return limitedData;
  };

  var getTypeFilteredData = function (data) {
    // console.log('фильтрация по типу');
    // console.log(data);
    if (typeFilterField.value === 'any') {
      var filteredData = data;
    } else {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.type === typeFilterField.value;
      });
    }
    return filteredData;
  };

  var getPriceFilteredData = function (data) {
    // console.log('фильтрация по цене');
    // console.log(data);
    if (priceFilterField.value === 'any') {
      var filteredData = data;
    } else if (priceFilterField.value === 'low') {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.price <= LOW_PRICE_TOP;
      });
    } else if (priceFilterField.value === 'high') {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.price >= HIGH_PRICE_BOTTOM;
      });
    } else if (priceFilterField.value === 'medium') {
      filteredData = data.filter(function (dataElement) {
        return (dataElement.offer.price < HIGH_PRICE_BOTTOM && dataElement.offer.price > LOW_PRICE_TOP);
      });
    }
    return filteredData;
  };

  var getRoomsFilteredData = function (data) {
    // console.log('фильтрация по комнатам');
    // console.log(data);
    if (roomsFilterField.value === 'any') {
      var filteredData = data;
    } else {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.rooms === roomsFilterField.value;
      });
    }
    return filteredData;
  };

  var getGuestsFilteredData = function (data) {
    // console.log('фильтрация по гостям');
    // console.log(data);
    if (guestsFilterField.value === 'any') {
      var filteredData = data;
    } else {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.guests === guestsFilterField.value;
      });
    }
    return filteredData;
  };

  var getAmenityFilteredData = function (data) {
    // console.log('фильтрация по удобствам');
    // console.log(data);
    var wifiFilteredData = getAdvertsWithAmenity(wifiCheckbox, data);
    var dishwasherFilteredData = getAdvertsWithAmenity(dishwasherCheckbox, wifiFilteredData);
    var parkingFilteredData = getAdvertsWithAmenity(parkingCheckbox, dishwasherFilteredData);
    var washerFilteredData = getAdvertsWithAmenity(washerCheckbox, parkingFilteredData);
    var elevatorFilteredData = getAdvertsWithAmenity(elevatorCheckbox, washerFilteredData);
    var conditionerFilteredData = getAdvertsWithAmenity(conditionerCheckbox, elevatorFilteredData);

    var fullyFilteredData = conditionerFilteredData;

    return fullyFilteredData;
  };

  var getAdvertsWithAmenity = function (amenityElement, data) {
    var filteredAmenityData = [];

    if (amenityElement.checked) {
      for (var i = 0; i < data.length; i++) {
        var hasAmenity = false;

        for (var j = 0; j < data[j].offer.features.length; i++) {
          if (data[j].offer.features === amenityElement.value) {
            hasAmenity = true;
          }
        }

        if (hasAmenity) {
          filteredAmenityData.push(data[i]);
        }
      }

    } else {
      filteredAmenityData = data;
    }
    return filteredAmenityData;
  };

  var getFullyFilteredData = function (data) {
    var typeFilteredData = getTypeFilteredData(data);
    var priceFilteredData = getPriceFilteredData(typeFilteredData);
    var roomsFilteredData = getRoomsFilteredData(priceFilteredData);
    var guestsFilteredData = getGuestsFilteredData(roomsFilteredData);
    var amenityFilteredData = getAmenityFilteredData(guestsFilteredData);

    var summaryData = amenityFilteredData;
    return summaryData;
  };

  typeFilterField.addEventListener('change', function () {
    window.map.renderAdvertsOnMap(window.nativeData);
  });

  window.filter = {
    getFullyFilteredData: getFullyFilteredData,
    limitData: limitData
  };
})();
