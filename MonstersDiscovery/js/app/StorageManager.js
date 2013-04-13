/*
 * INVENKTION.StorageManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce il salvataggio dati e il loro caricamento
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
		 saveLevelResult : function(levelCode,percentage) {
				//TODO
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.StorageManager = mod;
})(jQuery, window);
	