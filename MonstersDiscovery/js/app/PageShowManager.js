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
		//### HOME
		if(currentPage == 'home') {
			
		}
		//### SEZIONI
		if(currentPage == 'sezioni') {
			//Costruisco la gallery
			$("#gallery").html("");
			var num = INVENKTION.LevelManager.getSectionCount();
			for(var i=0; i<num; i++) {
				var sec = INVENKTION.LevelManager.getSection(i);
				$("#gallery").append("<img width='150' class='sectionImage' data-sezione='"+i+"' src='"+sec.immagine+"'/>");
			}
			
			//Evento selezione gallery
			$(".sectionImage").bind("click",function(){
				//estraggo l'indice dell'immagine della gallery corrente
				var index = $(this).attr('data-sezione');
				console.log("sezione selezionata: "+index);
				INVENKTION.StorageManager.setItem("currentSection",index+"");
				$.mobile.changePage( "#livelli");
			});
		}
		//### LIVELLI
		if(currentPage == 'livelli') {
			//Costruisco la gallery
			$("#levelgallery").html("");
			var index = INVENKTION.StorageManager.getItem("currentSection");
			var section = INVENKTION.LevelManager.getSection(parseInt(index));
			var num = INVENKTION.LevelManager.getSectionLevelCount(section);
			console.log("Numero livelli di questa sezione:"+num)
			for(var i=0; i<num; i++) {
				var lev = INVENKTION.LevelManager.getSectionLevel(section,i);
				$("#levelgallery").append("<img width='150' class='levelImage' data-livello='"+i+"' src='"+lev.immagine+"'/>");
			}
			
			//Evento selezione gallery
			$(".levelImage").bind("click",function(){
				//estraggo l'indice dell'immagine della gallery corrente
				var index = $(this).attr('data-livello');
				console.log("livello selezionata: "+index);
				INVENKTION.StorageManager.setItem("currentLevel",index+"");
				$.mobile.changePage( "#canvas");
			});
		}
		//### CANVAS
		if(currentPage == 'canvas') {
			mainHeight = $(window).height();
			$('.imgContainer').css('width',mainHeight);
			$('.paletteContainerInn').css('margin-top',(mainHeight*-0.7)/2);
			
			$(document).bind("click",function(event){
				if($(event.target).attr("class") == 'palette') {
					alert("ho cliccato sulla TAVOLOZZA");
					if(INVENKTION.DrawCanvasManager.getBrushType() == 'BRUSH') {
						INVENKTION.DrawCanvasManager.setBrushType('ERASER');
					}else {
						INVENKTION.DrawCanvasManager.setBrushType('BRUSH');
					}
					
					INVENKTION.DrawCanvasManager.setBrushColor('#00F');
				}
			});
			//Inizializzo il canvas
			INVENKTION.DrawCanvasManager.initCanvas();
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
	