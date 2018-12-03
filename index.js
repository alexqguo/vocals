(function() {
  'use strict';

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const fileUploadInput = document.getElementById('file-upload');
  fileUploadInput.addEventListener('change', handleAudioUpload);

  function handleAudioUpload(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      console.log(e.target.result);
    };

    fileReader.readAsArrayBuffer(file);
  }
})();
