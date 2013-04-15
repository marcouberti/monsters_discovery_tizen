/*
 * INVENKTION.LevelManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce i livelli
 * 
 */
(function($, exports){
	
	//Metodi e variabili private
	var sezioni = [
	               //### SEZIONE 1
	               {
	            	   codice:			"w1",
	            	   nome:			"mondo1",
	            	   immagine:		"images/section1.png",
	            	   immagineBlocked: "images/section1blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w1m1",
	            	           		 nome:	 		"w1m1",
	            	           		 immagine:		"images/world1/w1m1.png",
	            	           		 colori:  [
	            	           		           {
	            	           		        	   r: 0,g: 0, b: 0
	            	           		           },
	            	           		           {
	            	           		        	   r: 0,g: 0, b: 0
	            	           		           },
	            	           		           {
	            	           		        	   r: 0,g: 0, b: 0
	            	           		           }
	            	           		           ]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m2",
	            	           		 nome:	 		"w1m2",
	            	           		 immagine:		"images/world1/w1m2.png",
	            	           		 colori:  [
	            	           		           {
	            	           		        	   r: 0,g: 0, b: 0
	            	           		           },
	            	           		           {
	            	           		        	   r: 0,g: 0, b: 0
	            	           		           },
	            	           		           {
	            	           		        	   r: 0,g: 0, b: 0
	            	           		           }
	            	           		           ]
	            	           	 }
	            	           	 ]
	               }
	               ];

	//Il nostro oggetto da esporre
	var mod = {
		 //Numero di sezioni
		 getSectionCount : function() {
			 return sezioni.length;
		 },
		 //Numero dei livelli di una particolare sezione
		 getSectionLevelCount: function(section) {
			return section.livelli.length; 
		 },
		 //Restituisce la sezione dato il suo numero
		 getSection: function(index) {
			 return sezioni[index];
		 },
		 //Restituisce il livello di una specifica sezione dato il suo numero
		 getSectionLevel: function(section,index) {
			 return section.livelli[index];
		 },
		 isLevelUnlocked: function(level) {
			 var unlocked = INVENKTION.StorageManager.getItem(level.codice+"_unlocked");
			 if(unlocked == "true") return true;
			 else return false;
		 },
		 unlockLevel: function(level) {
			 INVENKTION.StorageManager.setItem(level.codice+"_unlocked", "true");
		 },
		 getLevelBestResult: function(level) {
			 var percentage = INVENKTION.StorageManager.getItem(level.codice+"_best");
			 if(!percentage) return "0";
			 else return percentage;
		 },
		 setLevelBestResult: function(level, percentage) {
			 INVENKTION.StorageManager.setItem(level.codice+"_best", percentage);
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.LevelManager = mod;
})(jQuery, window);
	