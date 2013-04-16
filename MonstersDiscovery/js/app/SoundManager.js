/*
 * INVENKTION.SoundManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce l'audio e i suoni
 * 
 */
(function($, exports){

	//Il nostro oggetto da esporre
	var mod = {
		 playBackgroundMusic : function() {
			 var backgroundSound = document.querySelector("audio.background");
			 if(backgroundSound) {
				 backgroundSound.play();
			 }
		 },
		 stopBackgroundMusic : function() {
			 var backgroundSound = document.querySelector("audio.background");
			 if(backgroundSound) {
				 backgroundSound.pause();
			 }
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.SoundManager = mod;
})(jQuery, window);
	