'use strict';

(function () {

  var LOW_PRICE_TOP = 10000;
  var HIGH_PRICE_BOTTOM = 50000;

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

  var limitData = function (data, limit) {
    var limitedData = data.slice(0, limit);
    return limitedData;
  };

  var getTypeFilteredData = function (data) {

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

    if (priceFilterField.value === 'any') {
      var filteredData = data;
    } else if (priceFilterField.value === 'low') {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.price < LOW_PRICE_TOP;
      });
    } else if (priceFilterField.value === 'high') {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.price > HIGH_PRICE_BOTTOM;
      });
    } else if (priceFilterField.value === 'middle') {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.price <= HIGH_PRICE_BOTTOM && dataElement.offer.price >= LOW_PRICE_TOP;
      });
    }
    return filteredData;
  };

  var getRoomsFilteredData = function (data) {

    if (roomsFilterField.value === 'any') {
      var filteredData = data;
    } else {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.rooms === +roomsFilterField.value;
      });
    }
    return filteredData;
  };

  var getGuestsFilteredData = function (data) {

    if (guestsFilterField.value === 'any') {
      var filteredData = data;
    } else {
      filteredData = data.filter(function (dataElement) {
        return dataElement.offer.guests === +guestsFilterField.value;
      });
    }
    return filteredData;
  };

  var getAmenityFilteredData = function (data) {

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

        for (var j = 0; j < data[i].offer.features.length; j++) {
          if (data[i].offer.features[j] === amenityElement.value) {
            hasAmenity = true;
            break;
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
    var summaryData = [];
    for (var i = 0; i < amenityFilteredData.length; i++) {
      if (amenityFilteredData[i].offer) {
        summaryData.push(amenityFilteredData[i]);
      }
    }
    return summaryData;
  };

  var onFilterAmenityCheckboxPressEnter = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      if (evt.target.checked) {
        evt.target.checked = false;
      } else {
        evt.target.checked = true;
      }
      window.map.reloadPins();
    }
  };

  window.filter = {
    getFullyFilteredData: getFullyFilteredData,
    limitData: limitData,
    guestsFilterField: guestsFilterField,
    typeFilterField: typeFilterField,
    priceFilterField: priceFilterField,
    roomsFilterField: roomsFilterField,
    onFilterAmenityCheckboxPressEnter: onFilterAmenityCheckboxPressEnter
  };
})();
