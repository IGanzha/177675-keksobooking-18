'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_SRC = 'img/muffin-grey.svg';
  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoFileChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo img');

  var showPreview = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      if (preview.hidden) {
        preview.hidden = false;
      }

      var file = fileChooser.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });

          reader.readAsDataURL(file);
        }
      }
    });
  };

  var hidePreview = function (preview, srcURL, isHidden) {
    preview.src = srcURL;
    preview.hidden = isHidden;
  };

  showPreview(avatarFileChooser, avatarPreview);
  showPreview(photoFileChooser, photoPreview);

  window.preview = {
    hidePreview: hidePreview,
    avatarPreview: avatarPreview,
    AVATAR_SRC: AVATAR_SRC,
    photoPreview: photoPreview
  };

})();
