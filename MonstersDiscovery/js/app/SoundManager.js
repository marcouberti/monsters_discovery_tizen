/*
 * INVENKTION.SoundManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce l'audio e i suoni
 * 
 */
(function($, exports){

	var audioON = true;
	
	//Il nostro oggetto da esporre
	var mod = {
		 playSound : function(className) {
			 if(INVENKTION.SoundManager.isAudioOn()) {//scelta utente audio on off
				 var sound = document.querySelector("audio."+className);
				 if(sound) {
					 sound.play();
				 }
			 }
		 },
		 playBackgroundMusic : function() {
			 if(INVENKTION.SoundManager.isAudioOn()) {//scelta utente audio on off
				 var backgroundSound = document.querySelector("audio.background");
				 if(backgroundSound) {
					 backgroundSound.play();
				 }
			 }
		 },
		 stopBackgroundMusic : function() {
			 var backgroundSound = document.querySelector("audio.background");
			 if(backgroundSound) {
				 backgroundSound.pause();
			 }
		 },
		 setAudio: function(onoff) {
			 audioON = onoff;
		 },
		 isAudioOn: function() {
			 return audioON;
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.SoundManager = mod;
})(jQuery, window);
	