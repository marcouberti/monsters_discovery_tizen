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
	//Gestione visibilità pagina, per abilitare e disabilitare il suono in automatico
	var hidden, visibilityState, visibilityChange;
	var music = document.getElementById("music");
	if (typeof document.hidden !== "undefined") {
	        hidden = "hidden"; visibilityChange = "visibilitychange"; visibilityState = "visibilityState";
	}
	else if (typeof document.mozHidden !== "undefined") {
	        hidden = "mozHidden"; visibilityChange = "mozvisibilitychange"; visibilityState = "mozVisibilityState";
	}
	else if (typeof document.msHidden !== "undefined") {
	        hidden = "msHidden"; visibilityChange = "msvisibilitychange"; visibilityState = "msVisibilityState";
	}
	else if (typeof document.webkitHidden !== "undefined") {
	        hidden = "webkitHidden"; visibilityChange = "webkitvisibilitychange"; visibilityState = "webkitVisibilityState";
	}
	
	document.addEventListener(visibilityChange, function() {
	        console.log("hidden: " + document[hidden]);
	        console.log(document[visibilityState]);
	
	        switch (document[visibilityState]) {
	        case "visible":
	        	INVENKTION.SoundManager.playBackgroundMusic();
	            break;
	        case "hidden":
	        	INVENKTION.SoundManager.stopBackgroundMusic();
	            break;
	        }
	});

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
	