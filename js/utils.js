'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var mapSection = document.querySelector('.map');
  var formFieldsets = document.querySelectorAll('fieldset');
  var mapFilterInputs = document.querySelector('.map__filters').querySelectorAll('select');


  var disableInputs = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < mapFilterInputs.length; i++) {
      mapFilterInputs[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableInputs = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
    for (i = 0; i < mapFilterInputs.length; i++) {
      mapFilterInputs[i].removeAttribute('disabled');
    }
  };

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    mapSection: mapSection,
    enableInputs: enableInputs,
    disableInputs: disableInputs,
    formFieldsets: formFieldsets,
    mapFilterInputs: mapFilterInputs
  };

})();
