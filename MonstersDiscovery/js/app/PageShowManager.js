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
	
	//Gestione visibilità pagina, per abilitare e disabilitare il suono in automatico
	//o tutte quelle cose che vanno stoppate, ad esempio il tempo
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
	        	INVENKTION.TimerManager.resume();
	            break;
	        case "hidden":
	        	INVENKTION.SoundManager.stopBackgroundMusic();
	        	INVENKTION.TimerManager.pause();
	            break;
	        }
	});
	//Modello che contiene i tag fino ad ora ricevuti (una sorta di cache per i miei controlli e matching)
	var currentPage;
	
	//Evento dopo che la pagina è stata lasciata
	$(document).bind('pagehide', function(event){
		currentPage = $(event.target).attr("id");
		console.log("--> uscito dalla pagina..."+currentPage);
		//### HOME
		if(currentPage == 'canvas') {
			console.log("fermo eventuale worker timer");
			INVENKTION.TimerManager.stop();
		}
	});
	
	//Con questo metodo riesco a intercettare quando una pagina sta per essere mostrata
	//e di conseguenza fare gli aggiornamenti alla UI del caso
	$(document).bind('pagebeforeshow', function(event){
		currentPage = $(event.target).attr("id");
		console.log("sono nella pagina..."+currentPage);
		
		//### HOME
		if(currentPage == 'home') {
			//FUNZIONE TEMPORALE PER L'ANIMAZIONE IN HOME
			setInterval(function() {
		    	$('.bg1').fadeToggle(3000);
			}, 7000);
			//TOGGLE AUDIO
			$('.home_audioBtn').live('click', function () {
				$('.home_audioBtn').toggleClass('hidden');
				if (!$(this).hasClass('mute')){
					alert('rimuovi audio');
				}else{
					alert('riparte audio');
				}			
			});
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
			//Altero la history inserendo tra questa pagina e quella del canvas una pagina di dialog
			//history.pushState({}, "Monsters Discovery", "index.html#dialog");
			
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
			//$('.paletteContainerInn').css('margin-top',(mainHeight*-0.7)/2);
			
			$(document).bind("click",function(event){
				if($(event.target).attr("class") && $(event.target).attr("class").indexOf("tavcol") != -1) {
					INVENKTION.DrawCanvasManager.setBrushColor($(event.target).css("background-color"));
					INVENKTION.SoundManager.playSound('plaf');
				}
			});
			
			$(".gommaBtn").bind("click",function(event){
				INVENKTION.DrawCanvasManager.setBrushType('ERASER');
				INVENKTION.SoundManager.playSound('plaf');
			});
			
			$(".sizer_add").bind("click",function(event){
				INVENKTION.DrawCanvasManager.increaseBrushSize();
				INVENKTION.SoundManager.playSound('plaf');
			});
			
			$(".sizer_less").bind("click",function(event){
				INVENKTION.DrawCanvasManager.decreaseBrushSize();
				INVENKTION.SoundManager.playSound('plaf');
			});
			
			//Inizializzo il canvas
			INVENKTION.DrawCanvasManager.initCanvas();
			//Faccio partire il tempo
			INVENKTION.TimerManager.start();
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
	