/*
 * INVENKTION.SoundManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce l'audio e i suoni
 * 
 */
(function($, exports){
	
	//Metodi e variabili private
	var privateFunction = function(){
		
	};

	//Modello che contiene i tag fino ad ora ricevuti (una sorta di cache per i miei controlli e matching)
	var private_field = {};

	//Il nostro oggetto da esporre
	var mod = {
		 playBackgroundMusic : function() {
			 var backgroundSound = document.querySelector("audio.background");
			 backgroundSound.play();
		 },
		 stopBackgroundMusic : function() {
			 var backgroundSound = document.querySelector("audio.background");
			 backgroundSound.pause();
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.SoundManager = mod;
})(jQuery, window);
	