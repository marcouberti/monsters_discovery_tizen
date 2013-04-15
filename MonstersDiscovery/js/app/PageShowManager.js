/*
 * INVENKTION.PageShowManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce gli eventi di cambiamento pagine
 * 
 */
(function($, exports){
	
	//Metodi e variabili private
	var privateFunction = function(){};
	//Modello che contiene i tag fino ad ora ricevuti (una sorta di cache per i miei controlli e matching)
	var currentPage;
	
	//Con questo metodo riesco a intercettare quando una pagina sta per essere mostrata
	//e di conseguenza fare gli aggiornamenti alla UI del caso
	$(document).bind('pagebeforeshow', function(event){
		currentPage = $(event.target).attr("id");
		console.log("sono nella pagina..."+currentPage);
		if(currentPage == 'sezioni') {
			$("#gallery").gallery('empty');//svuoto
			var num = INVENKTION.LevelManager.getSectionCount();
			for(var i=0; i<num; i++) {
				var sec = INVENKTION.LevelManager.getSection(i);
				$("#gallery").gallery('add', sec.immagine);
			}
			$("#gallery").gallery('refresh');
		}
	});

	//Il nostro oggetto da esporre
	var mod = {
			getCurrentPage: function(){
				return currentPage;
			}
	};

	//Espongo nel global object
	exports.INVENKTION.PageShowManager = mod;
})(jQuery, window);
	