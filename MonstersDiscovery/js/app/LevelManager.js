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
	var atelier = {
			codice:			"atelier",
      	    nome:			"atelier",
      	    sfondo:			"images/sfondi/sfondo1.png",
			livelli:	[
        	           	 {
        	           		 codice: 		"atm1",
        	           		 nome:	 		"atm1",
        	           		 immagine:		"images/mostri/atelier1.png",
        	           		 contorno:		"images/mostri/atelier1_tr.png",
        	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
        	           	 },
        	           	 {
        	           		 codice: 		"atm2",
        	           		 nome:	 		"atm2",
        	           		 immagine:		"images/mostri/atelier2.png",
        	           		 contorno:		"images/mostri/atelier2_tr.png",
        	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
        	           	 }
        	           	 ]
	};
	var sezioni = [
	               //### SEZIONE 1
	               {
	            	   codice:			"w1",
	            	   nome:			"mondo1",
	            	   sfondo:			"images/sfondi/sfondo1.png",
	            	   immagine:		"images/sezioni/sec1presentation.png",
	            	   immagineBlocked: "images/sezioni/sec1blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w1m1",
	            	           		 nome:	 		"w1m1",
	            	           		 immagine:		"images/mostri/w1_monster1.png",
	            	           		 contorno:		"images/mostri/w1_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m2",
	            	           		 nome:	 		"w1m2",
	            	           		 immagine:		"images/mostri/w1_monster2.png",
	            	           		 contorno:		"images/mostri/w1_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 2
	               {
	            	   codice:			"w2",
	            	   nome:			"mondo2",
	            	   sfondo:			"images/sfondi/sfondo2.png",
	            	   immagine:		"images/sezioni/sec2presentation.png",
	            	   immagineBlocked: "images/sezioni/sec2blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w2m1",
	            	           		 nome:	 		"w2m1",
	            	           		 immagine:		"images/mostri/w2_monster1.png",
	            	           		 contorno:		"images/mostri/w2_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m2",
	            	           		 nome:	 		"w2m2",
	            	           		 immagine:		"images/mostri/w2_monster2.png",
	            	           		 contorno:		"images/mostri/w2_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 3
	               {
	            	   codice:			"w3",
	            	   nome:			"mondo3",
	            	   sfondo:			"images/sfondi/sfondo3.png",
	            	   immagine:		"images/sezioni/sec3presentation.png",
	            	   immagineBlocked: "images/sezioni/sec3blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w3m1",
	            	           		 nome:	 		"w3m1",
	            	           		 immagine:		"images/mostri/w3_monster1.png",
	            	           		 contorno:		"images/mostri/w3_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m2",
	            	           		 nome:	 		"w3m2",
	            	           		 immagine:		"images/mostri/w3_monster2.png",
	            	           		 contorno:		"images/mostri/w3_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 4
	               {
	            	   codice:			"w4",
	            	   nome:			"mondo4",
	            	   sfondo:			"images/sfondi/sfondo4.png",
	            	   immagine:		"images/sezioni/sec4presentation.png",
	            	   immagineBlocked: "images/sezioni/sec4blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w4m1",
	            	           		 nome:	 		"w4m1",
	            	           		 immagine:		"images/mostri/w4_monster1.png",
	            	           		 contorno:		"images/mostri/w4_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m2",
	            	           		 nome:	 		"w4m2",
	            	           		 immagine:		"images/mostri/w4_monster2.png",
	            	           		 contorno:		"images/mostri/w4_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 5
	               {
	            	   codice:			"w5",
	            	   nome:			"mondo5",
	            	   sfondo:			"images/sfondi/sfondo5.png",
	            	   immagine:		"images/sezioni/sec5presentation.png",
	            	   immagineBlocked: "images/sezioni/sec5blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w5m1",
	            	           		 nome:	 		"w5m1",
	            	           		 immagine:		"images/mostri/w5_monster1.png",
	            	           		 contorno:		"images/mostri/w5_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m2",
	            	           		 nome:	 		"w5m2",
	            	           		 immagine:		"images/mostri/w5_monster2.png",
	            	           		 contorno:		"images/mostri/w5_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE BONUS
	               {
	            	   codice:			"wb",
	            	   nome:			"mondob",
	            	   sfondo:			"images/sfondi/sfondobonus.png",
	            	   immagine:		"images/sezioni/bonuspresentation.png",
	            	   immagineBlocked: "images/sezioni/bonuspresentation.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"wbm1",
	            	           		 nome:	 		"wbm1",
	            	           		 immagine:		"images/mostri/wb_monster1.png",
	            	           		 contorno:		"images/mostri/wb_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm2",
	            	           		 nome:	 		"wbm2",
	            	           		 immagine:		"images/mostri/wb_monster2.png",
	            	           		 contorno:		"images/mostri/wb_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
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
	