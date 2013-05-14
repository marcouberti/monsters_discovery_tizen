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
	
	//Impedisco di scrollare la pagina
	document.addEventListener("touchstart", function(e){e.preventDefault();}, false);
	document.addEventListener("touchmove", function(e){e.preventDefault();}, false);
	document.addEventListener("touchend", function(e){e.preventDefault();}, false);
	document.addEventListener("touchcancel", function(e){e.preventDefault();}, false);
	
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
			$(".home_btn1").bind('tap', function (event) {
				if(event.handled !== true) {
		    		event.handled = true;
		    		$.mobile.changePage( "#sezioni");
				}
			});
			$(".home_creditsBtn").bind("tap", function (event) {
				if(event.handled !== true) {
					popUpStart(msg_credits);
				}
			});
			$(".credit_close").bind("tap", function (event) {
				if(event.handled !== true) {
					$("#credits").popup("close");
				}
			});
			$(".home_logoInvenktion").bind("tap", function (event) {
				if(event.handled !== true) {
		    		location.replace("http://www.invenktion.com");
				}
			});
			$(".MS_popUpClose").bind("tap", function (event) {
				if(event.handled !== true) {
		    		popUpClose();
				}
			});
			
			//TOGGLE AUDIO
			$('.home_audioBtn').bind('tap', function (event) {
				if(event.handled !== true) {
		    		event.handled = true;
					$('.home_audioBtn').toggleClass('hidden');
					if (!$(this).hasClass('mute')){
						INVENKTION.SoundManager.setAudio(false);
						INVENKTION.SoundManager.stopBackgroundMusic();
					}else{
						INVENKTION.SoundManager.setAudio(true);
						INVENKTION.SoundManager.playBackgroundMusic();
					}			
				}
			});
			//ESEMPI DI CONTENUTI POPUP
			var msg_credits = '<h1>Credits</h1><div class="creditsContainer"><ul><li>Marco Uberti <span>Software Engineering</span> </li><li>Andrea Grilli <span>Creative artist</span></li></ul></div>'
			
			//Setto il PopUp
		    function popUpStart (msg) {
		    	//Variabili
		    	_W = window.innerWidth*0.6;
		    	_H = window.innerHeight*0.7;
		    	
		    	//Carico il contenuto
		    	$('.MS_popUpInn').html(msg);
		    	//Visualizzo il popUp con qualche effetto speciale
		    	$('.MS_popUpContainer').show('fast', function() {
		    		// Animation complete.
		    		$('.MS_popUp').animate({
		    			left:(window.innerWidth/2)-(_W/2),
		    			top:(window.innerHeight/2)-(_H/2),
		    			width: _W,
		    			height: _H
		    		}, 1000, function() {
		    			//Animation Complete
		    			$('.MS_popUpInn').show('fast');
		    		});
		    	});
		    }
			//Chiudo il PopUp
			function popUpClose () {
				$('.MS_popUpInn').hide('fast');
				/*$('.MS_popUp').animate({
	    			width: 10,
	    			height: 10
	    		});*/
				$('.MS_popUpContainer').hide('fast');
			}
		}
		
		//### SEZIONI
		if(currentPage == 'sezioni') {
				$("#wrapper, #wrapper_livelli").html("");//svuoto
				$("#wrapper").css("width",window.innerWidth);
				$("#wrapper").css("height",window.innerHeight);
				var	gallery,
					el,
					i,
					page,
					slides = INVENKTION.LevelManager.getSezioni();
	
				gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });
		
				// Load initial data
				for (i=0; i<3; i++) {
					page = i==0 ? slides.length-1 : i-1;
					el = document.createElement('img');
					
					//Controllo se la sezione è sbloccata o meno
					var sec = INVENKTION.LevelManager.getSection(page);
					var stars = INVENKTION.LevelManager.getSectionTotalStars(sec);
					var unlocked = INVENKTION.LevelManager.isSectionUnlocked(sec);
					var statusImage;
					var correctClass = "sectionImage";
					if(unlocked) {
						statusImage = sec.immagine;
					}else {
						statusImage = sec.immagineBlocked;
						correctClass = "lockedSection";
					}
					
					el.src = statusImage;
					el.width = window.innerHeight;
					el.height = window.innerHeight;
					
					gallery.masterPages[i].appendChild(el);
					
					var secImg = $(el);
					secImg.removeClass("lockedSection");
					secImg.removeClass("sectionImage");
					secImg.addClass(correctClass);
					
					el = document.createElement('span');
					el.innerHTML = stars+"/"+(sec.livelli.length)*3 +" Stars";
					gallery.masterPages[i].appendChild(el)
				}
		
				gallery.onFlip(function () {
					var el,
						upcoming,
						i;
		
					for (i=0; i<3; i++) {
						upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
		
						if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
							el = gallery.masterPages[i].querySelector('img');
							
							//Controllo se la sezione è sbloccata o meno
							var sec = INVENKTION.LevelManager.getSection(upcoming);//non page come sopra!
							var stars = INVENKTION.LevelManager.getSectionTotalStars(sec);
							var unlocked = INVENKTION.LevelManager.isSectionUnlocked(sec);
							var statusImage;
							var correctClass = "sectionImage";
							if(unlocked) {
								statusImage = sec.immagine;
							}else {
								statusImage = sec.immagineBlocked;
								correctClass = "lockedSection";
							}
							
							el.src = statusImage;
							el.width = window.innerHeight;
							el.height = window.innerHeight;
	
							var secImg = $(el);
							secImg.removeClass("lockedSection");
							secImg.removeClass("sectionImage");
							secImg.addClass(correctClass);
							el = gallery.masterPages[i].querySelector('span');
							el.innerHTML = stars+"/"+(sec.livelli.length)*3 +" Stars";
						}
					}
				});
		
				gallery.onMoveOut(function () {
					gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
				});
		
				gallery.onMoveIn(function () {
					var className = gallery.masterPages[gallery.currentMasterPage].className;
					/(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
				});
				
				//Se esiste tra le variabili salvate l'ultima sezione cliccata, mi posiziono li
				var lastSectionUsed = INVENKTION.StorageManager.getItem("currentSection");
				if(lastSectionUsed && parseInt(lastSectionUsed) > 0) {
					console.log("Ultima sezione visitata = "+lastSectionUsed);
					gallery.goToPage(parseInt(lastSectionUsed));
				}
				
				//Evento selezione gallery
				$("#wrapper .swipeview-active").live('tap',function(event){
					if(event.handled !== true) {
			    		event.handled = true;
						//estraggo l'indice dell'immagine della gallery corrente
			    		if($(this).find(".sectionImage").size() > 0) {
							var index = $(this).attr('data-page-index');
							console.log("sezione selezionata: "+index);
							INVENKTION.StorageManager.setItem("currentSection",index+"");
							$.mobile.changePage( "#livelli");
			    		}
					}
				});
				
				//BACK BUTTON
				$(".jsBackHome").bind('tap',function(event){
					if(event.handled !== true) {
			    		event.handled = true;
						$.mobile.changePage( "#home");
					}
				});
		}
		
		//### LIVELLI
		if(currentPage == 'livelli') {
			$("#wrapper,#wrapper_livelli").html("");//svuoto
			$("#wrapper_livelli").css("width",window.innerWidth);
			$("#wrapper_livelli").css("height",window.innerHeight);
			
			var index = INVENKTION.StorageManager.getItem("currentSection");
			var section = INVENKTION.LevelManager.getSection(parseInt(index));
			
			var	gallery,
				el,
				i,
				page,
				slides = section.livelli;

			gallery = new SwipeView('#wrapper_livelli', { numberOfPages: slides.length });
	
			// Load initial data
			for (i=0; i<3; i++) {
				page = i==0 ? slides.length-1 : i-1;
				el = document.createElement('img');
				
				//Controllo se il livello è sbloccato o meno
				var lev = INVENKTION.LevelManager.getSectionLevel(section,page);
				var stars = INVENKTION.LevelManager.getLevelStars(section,lev);
				var unlocked = INVENKTION.LevelManager.isLevelUnlocked(lev);
				var statusImage;
				var correctClass = "levelImage";
				if(unlocked) {
					statusImage = lev.immagine;
				}else {
					statusImage = lev.immagine;
					correctClass = "lockedLevel";
				}
				
				el.src = statusImage;
				el.width = window.innerHeight;
				el.height = window.innerHeight;
				
				gallery.masterPages[i].appendChild(el);
				
				var secImg = $(el);
				secImg.removeClass("levelImage");
				secImg.removeClass("lockedLevel");
				secImg.addClass(correctClass);
				
				el = document.createElement('span');
				el.innerHTML = "Stars : "+stars;
				gallery.masterPages[i].appendChild(el)
			}
	
			gallery.onFlip(function () {
				var el,
					upcoming,
					i;
	
				for (i=0; i<3; i++) {
					upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
	
					if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
						el = gallery.masterPages[i].querySelector('img');
						
						//Controllo se il livello è sbloccato o meno
						var lev = INVENKTION.LevelManager.getSectionLevel(section,upcoming);
						var stars = INVENKTION.LevelManager.getLevelStars(section,lev);
						var unlocked = INVENKTION.LevelManager.isLevelUnlocked(lev);
						var statusImage;
						var correctClass = "levelImage";
						if(unlocked) {
							statusImage = lev.immagine;
						}else {
							statusImage = lev.immagine;
							correctClass = "lockedLevel";
						}
						
						el.src = statusImage;
						el.width = window.innerHeight;
						el.height = window.innerHeight;
	
						var secImg = $(el);
						secImg.removeClass("levelImage");
						secImg.removeClass("lockedLevel");
						secImg.addClass(correctClass);
						el = gallery.masterPages[i].querySelector('span');
						el.innerHTML = "Stars : "+stars;
					}
				}
			});
	
			gallery.onMoveOut(function () {
				gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
			});
	
			gallery.onMoveIn(function () {
				var className = gallery.masterPages[gallery.currentMasterPage].className;
				/(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
			});
			
			//Se esiste tra le variabili salvate l'ultima sezione cliccata, mi posiziono li
			var lastSectionUsed = INVENKTION.StorageManager.getItem("currentLevel");
			if(lastSectionUsed && parseInt(lastSectionUsed) > 0) {
				console.log("Ultimo livello visitato = "+lastSectionUsed);
				gallery.goToPage(parseInt(lastSectionUsed));
			}
			
			//Evento selezione gallery
			$("#wrapper_livelli .swipeview-active").live('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					//estraggo l'indice dell'immagine della gallery corrente
		    		if($(this).find(".levelImage").size() > 0) {
						var index = $(this).attr('data-page-index');
						console.log("livello selezionata: "+index);
						INVENKTION.StorageManager.setItem("currentLevel",index+"");
						$.mobile.changePage( "#canvas");
		    		}
				}
			});
			
			//BACK BUTTON
			$(".jsBackSezioni").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					$.mobile.changePage( "#sezioni");
				}
			});
		}
		
		//### CANVAS
		if(currentPage == 'canvas') {
			mainHeight = $(window).height();
			$('.imgContainer').css('width',mainHeight);
			//$('.paletteContainerInn').css('margin-top',(mainHeight*-0.7)/2);
			
			//BACK BUTTON
			$(".jsBackLivelli").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					$.mobile.changePage( "#livelli");
				}
			});
			
			$(document).bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					if($(event.target).attr("class") && $(event.target).attr("class").indexOf("tavcol") != -1) {
						INVENKTION.DrawCanvasManager.setBrushColor($(event.target).css("background-color"));
						INVENKTION.SoundManager.playSound('plaf');
					}
				}
			});
			
			$(".gommaBtn").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					INVENKTION.DrawCanvasManager.setBrushType('ERASER');
					INVENKTION.SoundManager.playSound('plaf');
				}
			});
			
			$(".checkBtn").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		INVENKTION.DrawCanvasManager.checkUserDrawing();
		    		//$(".mubcanvas").width($(".mubcanvas").width()-50);
		    		//$("canvas").width($("canvas").width()-50);
		    		//console.log($("canvas").width());
				}
			});
			
			$(".sizer_add").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					INVENKTION.DrawCanvasManager.increaseBrushSize();
					INVENKTION.SoundManager.playSound('plaf');
				}
			});
			
			$(".sizer_less").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					INVENKTION.DrawCanvasManager.decreaseBrushSize();
					INVENKTION.SoundManager.playSound('plaf');
				}
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
	
