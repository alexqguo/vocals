(function() {
  'use strict';

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const processor = audioCtx.createScriptProcessor(4096);
  const fileUploadInput = document.getElementById('file-upload');
  fileUploadInput.addEventListener('change', handleAudioUpload);

  function handleAudioUpload(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    const source = audioCtx.createBufferSource();

    fileReader.onload = function(e) {
      audioCtx.decodeAudioData(e.target.result, (buffer) => {
        source.buffer = buffer;
      }, (err) => {
        console.error(err);
        alert('something bad happened');
      });
    };

    fileReader.readAsArrayBuffer(file);
    source.connect(processor);
    processor.connect(audioCtx.destination);
    source.loop = true;
    source.start(0);
  }

  processor.onaudioprocess = function(e) {
    // for removal
    const inputL = e.inputBuffer.getChannelData(0);
    const inputR = e.inputBuffer.getChannelData(1);
    const outputL = e.outputBuffer.getChannelData(0);
    const outputR = e.outputBuffer.getChannelData(1);

    for (let i = 0; i < inputL.length; i++) {
      outputL[i] = (inputL[i] - inputR[i]) / 2;
      outputR[i] = (inputR[i] - inputL[i]) / 2;
    }
  }
})();
