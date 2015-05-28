var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);
var audio = require('audio-vs1053b').use(tessel.port['C']);

var textspeech = require('audio-vs1053b-textspeech').use(audio);

audio.on('ready', function(){
  audio.setVolume(.8, function(err){
    console.log('audio setup, application is ready to serve');
  });
});

audio.on('sayGoodMorning', function(){
  audio.setVolume(20, function(err){
      textspeech.speech('Good morning', {tl: 'en'});
    });
});


ambient.on('ready', function () {
   // Set a sound level trigger
   // The trigger is a float between 0 and 1
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
    console.log("Good morning :) :", data);

    audio.emit('sayGoodMorning');
    //textspeech.speech('Good morning!', {tl: 'en'}); // english
    // Clear it
    ambient.clearSoundTrigger();

    //After 1.5 seconds reset sound trigger
    setTimeout(function () {

        ambient.setSoundTrigger(0.1);

    },2000);

    });
});

ambient.on('error', function (err) {
  console.log(err);
});

audio.on('error', function(err){
  console.log(err);
});
