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
	        	//Faccio ripartire se e solo se non è aperto un POPUP
				if($('.MS_popUpContainer').css("display") != "block") {
					 INVENKTION.TimerManager.resume();
				}
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
		
		//### HOME
		if(currentPage == 'home') {
			$(".home_btn1").bind('tap', function (event) {
				if(event.handled !== true) {
		    		event.handled = true;
		    		$.mobile.changePage( "#sezioni");
				}
			});
			$(".home_btn3").bind('tap', function (event) {
				if(event.handled !== true) {
		    		event.handled = true;
		    		$.mobile.changePage( "#atelier");
				}
			});
			$(".home_creditsBtn").bind("tap", function (event) {
				if(event.handled !== true) {
					event.handled = true;
					INVENKTION.PageShowManager.popUpStart($('#MS_credits').html());
				}
			});
			$(".JS_quit").bind("tap", function (event) {
				if(event.handled !== true) {
					event.handled = true;
					INVENKTION.PageShowManager.popUpStart($('#MS_quit').html());
				}
			});
			$(".home_logoInvenktion").bind("tap", function (event) {
				if(event.handled !== true) {
					event.handled = true;
		    		location.replace("http://www.invenktion.com");
				}
			});
			
			$(".JS_popUpClose, .MS_popUpContainer").live("tap", function (event) {
				if(event.handled !== true) {
					event.handled = true;
					INVENKTION.PageShowManager.popUpClose();
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

		}
		
		//### SEZIONI
		if(currentPage == 'sezioni') {
				$("#wrapper, #wrapper_livelli,#wrapper_atelier").html("");//svuoto
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
					el.innerHTML = '<img class="setStars" src="images/setStars'+stars+'.png"/>';
					//el.innerHTML = stars+"/"+(sec.livelli.length)*3 +" Stars";
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
							el.innerHTML = '<img class="setStars" src="images/setStars'+stars+'.png"/>';
							//el.innerHTML = stars+"/"+(sec.livelli.length)*3 +" Stars";
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
				var lastSectionUsed = INVENKTION.LevelManager.getLastSectionUsed();
				if(parseInt(lastSectionUsed) > 0) {
					gallery.goToPage(parseInt(lastSectionUsed));
				}
				
				//Evento selezione gallery
				$("#wrapper .swipeview-active").live('tap',function(event){
					if(event.handled !== true) {
			    		event.handled = true;
						//estraggo l'indice dell'immagine della gallery corrente
			    		if($(this).find(".sectionImage").size() > 0) {
							var index = $(this).attr('data-page-index');
							INVENKTION.LevelManager.setLastSectionUsed(index+"");
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
			$("#wrapper,#wrapper_livelli,#wrapper_atelier").html("");//svuoto
			$("#wrapper_livelli").css("width",window.innerWidth);
			$("#wrapper_livelli").css("height",window.innerHeight);
			
			var sectionindex = INVENKTION.LevelManager.getLastSectionUsed();
			var section = INVENKTION.LevelManager.getSection(parseInt(sectionindex));
			
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
				el.innerHTML = '<h1 class="monsterTitle">'+lev.nome+'</h1><img class="setStars" src="images/setStars'+stars+'.png"/>';
				//el.innerHTML = lev.nome+" stars : "+stars;
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
						el.innerHTML = lev.nome+" stars : "+stars;
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
			var lastSectionUsed = INVENKTION.LevelManager.getLastSectionLevelUsed(sectionindex);
			if(parseInt(lastSectionUsed) > 0) {
				gallery.goToPage(parseInt(lastSectionUsed));
			}
			
			//Evento selezione gallery
			$("#wrapper_livelli .swipeview-active").live('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					//estraggo l'indice dell'immagine della gallery corrente
		    		if($(this).find(".levelImage").size() > 0) {
						var levelindex = $(this).attr('data-page-index');
						INVENKTION.LevelManager.setLastSectionLevelUsed(INVENKTION.LevelManager.getLastSectionUsed(),levelindex);
						INVENKTION.DrawCanvasManager.setGameMode("GAME");
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
			
			$(".tavcol").live("tap",function(event) {
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).addClass('animating');
		    		INVENKTION.DrawCanvasManager.setBrushColor($(this).css("background-color"));
					INVENKTION.SoundManager.playSound('plaf');
			    }
			});
			$(".tavcol").live('webkitAnimationEnd', function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).removeClass('animating');
				}
			});

			
			//GAME PAUSED // TODO - STOP TIME
			$(".jsBackLivelli").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		INVENKTION.TimerManager.pause();
		    		INVENKTION.PageShowManager.popUpStart($('#MS_gamePaused').html());
				}
			});
			$('.gamePause_1').live('tap', function(event) {
				//Continue
				if(event.handled !== true) {
		    		event.handled = true;
		    		console.log('Continue');
		    		INVENKTION.TimerManager.resume();
		    		INVENKTION.PageShowManager.popUpClose();
				}
		    });
			$('.gamePause_2').live('tap', function(event) {
				//Restart
				if(event.handled !== true) {
		    		event.handled = true;
		    		console.log('Restart');
		    		INVENKTION.TimerManager.stop();
		    		INVENKTION.PageShowManager.popUpClose();
					INVENKTION.DrawCanvasManager.initCanvas();
				}
		    });
			$('.gamePause_3').live('tap', function(event) {
				//Exit
				if(event.handled !== true) {
		    		event.handled = true;
		    		console.log('Exit gameplay, return to LIVELLI');
		    		INVENKTION.TimerManager.stop();
		    		INVENKTION.PageShowManager.popUpClose();
		    		if(INVENKTION.DrawCanvasManager.isGame()) {
		    			$.mobile.changePage( "#livelli");
		    		}else {
		    			$.mobile.changePage( "#atelier");
		    		}
				}
		    });
			
			/*
			$(document).bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					if($(event.target).attr("class") && $(event.target).attr("class").indexOf("tavcol") != -1) {
						INVENKTION.DrawCanvasManager.setBrushColor($(event.target).css("background-color"));
						INVENKTION.SoundManager.playSound('plaf');
					}
				}
			});
			*/
			//TOGGLE AUDIO
			$('.canvas_audioBtn').live('tap', function (event) {
				if(event.handled !== true) {
		    		event.handled = true;
					$('.canvas_audioBtn').toggleClass('hidden');
					if (!$(this).hasClass('mute')){
						INVENKTION.SoundManager.setAudio(false);
						INVENKTION.SoundManager.stopBackgroundMusic();
					}else{
						INVENKTION.SoundManager.setAudio(true);
						INVENKTION.SoundManager.playBackgroundMusic();
					}			
				}
			});
			
			$(".gommaBtn").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).addClass('animating');
					INVENKTION.DrawCanvasManager.setBrushType('ERASER');
					INVENKTION.SoundManager.playSound('plaf');
				}
			});
			
			$(".gommaBtn").live('webkitAnimationEnd', function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).removeClass('animating');
				}
			});
			
			$(".checkBtn").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		INVENKTION.DrawCanvasManager.checkUserDrawing();
				}
			});
			
			$(".sizer_add").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).addClass('animating');
					INVENKTION.DrawCanvasManager.increaseBrushSize();
					INVENKTION.SoundManager.playSound('plaf');
				}
			});
			$(".sizer_add").live('webkitAnimationEnd', function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).removeClass('animating');
				}
			});
			
			$(".sizer_less").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).addClass('animating');
					INVENKTION.DrawCanvasManager.decreaseBrushSize();
					INVENKTION.SoundManager.playSound('plaf');
				}
			});
			$(".sizer_less").live('webkitAnimationEnd', function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$(this).removeClass('animating');
				}
			});
			
			//Inizializzo il canvas (che fa partire il tempo)
			INVENKTION.DrawCanvasManager.initCanvas();
			$('.brushSize').html('15');// TO DO MUB - LEGGERE DIRETTAMENTE IL VALORE DEL PENNELLO DI DEFAULT /////////////////////
		}
	});

	//Il nostro oggetto da esporre
	var mod = {
			getCurrentPage: function(){
				return currentPage;
			},
			//Setto il PopUp
			popUpStart: function (msg) {
		    	//Variabili
		    	_W = window.innerWidth*0.6;
		    	_H = window.innerHeight*0.7;
		    	
		    	//Carico il contenuto
		    	$('.MS_popUpInn').html(msg);
		    	//Visualizzo il popUp con qualche effetto speciale
		    	$('.MS_popUpContainer').show(100, function() {
		    		// Animation complete.
		    		$('.MS_popUp').animate({
		    			left:(window.innerWidth/2)-(_W/2),
		    			top:(window.innerHeight/2)-(_H/2),
		    			width: _W,
		    			height: _H
		    		}, 100, function() {
		    			//Animation Complete
		    			$('.MS_popUpInn').show('fast');
		    		});
		    	});
		    },
		    popUpClose: function  () {
				$('.MS_popUpInn').hide(100);
				$('.MS_popUpContainer').hide(100);
			}
	};

	//Espongo nel global object
	exports.INVENKTION.PageShowManager = mod;
})(jQuery, window);
	
