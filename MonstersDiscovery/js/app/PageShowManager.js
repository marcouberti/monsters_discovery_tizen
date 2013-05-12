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
		
		if(currentPage == 'sezioni') {
				$("#wrapper").html("");//svuoto
				$("#wrapper").css("width",window.innerWidth);
				$("#wrapper").css("height",window.innerHeight);
				var	gallery,
				el,
				i,
				page,
				//dots = document.querySelectorAll('#nav li'),
				slides = [
					{
						img: "images/sezioni/sec1presentation.png",
						width: 300,
						height: 300,
						desc: 'Stars: 15/30'
					},
					{
						img: "images/sezioni/sec2presentation.png",
						width: 300,
						height: 300,
						desc: 'Stars: 15/30'
					},
					{
						img: "images/sezioni/sec3presentation.png",
						width: 300,
						height: 300,
						desc: 'Stars: 15/30'
					},
					{
						img: "images/sezioni/sec4presentation.png",
						width: 300,
						height: 300,
						desc: 'Stars: 15/30'
					},
					{
						img: "images/sezioni/sec5presentation.png",
						width: 300,
						height: 300,
						desc: 'Stars: 15/30'
					},
					{
						img: "images/sezioni/bonuspresentation.png",
						width: 300,
						height: 300,
						desc: 'Stars: 15/30'
					}
				];
	
			gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });
	
			// Load initial data
			for (i=0; i<3; i++) {
				page = i==0 ? slides.length-1 : i-1;
				el = document.createElement('img');
				//el.className = 'loading';
				el.src = slides[page].img;
				//el.width = slides[upcoming].width;
				//el.height = slides[upcoming].height;
				el.width = window.innerHeight;
				el.height = window.innerHeight;
				
				gallery.masterPages[i].appendChild(el);
				
				var secImg = $(el);
				secImg.attr("data-sezione",page);
				
				//el.onload = function () { this.className = ''; }
				
				el = document.createElement('span');
				el.innerHTML = slides[page].desc;
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
						//el.className = 'loading';
						el.src = slides[upcoming].img;
						//el.width = slides[upcoming].width;
						//el.height = slides[upcoming].height;
						el.width = window.innerHeight;
						el.height = window.innerHeight;

						var secImg = $(el);
						secImg.addClass("sectionImage");
						//el.onload = function () { this.className = ''; }
						el = gallery.masterPages[i].querySelector('span');
						el.innerHTML = slides[upcoming].desc;
					}
				}
				
				//document.querySelector('#nav .selected').className = '';
				//dots[gallery.pageIndex+1].className = 'selected';
			});
	
			gallery.onMoveOut(function () {
				gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
			});
	
			gallery.onMoveIn(function () {
				var className = gallery.masterPages[gallery.currentMasterPage].className;
				/(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
			});
			
			//Evento selezione gallery
			$(".swipeview-active").live('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					//estraggo l'indice dell'immagine della gallery corrente
					var index = $(this).attr('data-page-index');
					console.log("sezione selezionata: "+index);
					INVENKTION.StorageManager.setItem("currentSection",index+"");
					$.mobile.changePage( "#livelli");
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
		
		//### SEZIONI
		if(currentPage == 'sezioni_old') {
			//Ridimensiono la LI in base all'altezza dello schermo
			var wGal = $(window).height()*0.6;
					
			//Reinizializzo svuotando la gallery
			$("#gallery ul").html("");
			$('.galleryContainer').css('left',0);
			
			//Costruisco la gallery
			var num = INVENKTION.LevelManager.getSectionCount();
			//setto il totale
			$('#sectionTotal').html(num);
			for(var i=0; i<num; i++) {
				var sec = INVENKTION.LevelManager.getSection(i);
				var unlocked = INVENKTION.LevelManager.isSectionUnlocked(sec);
				var statusImage;
				var correctClass = "sectionImage";
				if(unlocked) {
					statusImage = sec.immagine;
				}else {
					statusImage = sec.immagineBlocked;
					correctClass = "lockedSection";
				}
				$("#gallery ul").append("<li><img class='"+correctClass+"' data-sezione='"+i+"' src='"+statusImage+"'/><h1>Section "+i+"</h1></li>");
			}
			
			//BACK BUTTON
			$(".jsBackHome").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					$.mobile.changePage( "#home");
				}
			});
			
			//Evento selezione gallery
			$(".sectionImage").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					//estraggo l'indice dell'immagine della gallery corrente
					var index = $(this).attr('data-sezione');
					console.log("sezione selezionata: "+index);
					INVENKTION.StorageManager.setItem("currentSection",index+"");
					$.mobile.changePage( "#livelli");
				}
			});
			//IMPOSTO I BOTTONI PREV e NEXT
			var sezioniSteps = 0;//CURRENT STEP
			var galleryDeltaMove = wGal;//DI QUANTO SI DEVE MUOVERE
			var timeTransition = 200;//tempo di animazione Slider
			//file:///Users/Giroll/git/mdtztest/MonstersDiscovery/images/mostri/w1_monster2.png
			$('.paginatorSectionShowGallery .next').bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					if (sezioniSteps < (num-1)) {
						sezioniSteps++;
						//alert(sezioniSteps+" "+galleryDeltaMove);
						sliderMoveTo(sezioniSteps);
						//$('#sectionCurrent').html(sezioniSteps+1);
					}
				}
			});
			$('.paginatorSectionShowGallery .prev').bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					if (sezioniSteps > 0) {
						sezioniSteps--;
						sliderMoveTo(sezioniSteps);
						//$('#sectionCurrent').html(sezioniSteps+1);
					}
				}
			});
			
			//Funzione per animare la gallery
			function sliderMoveTo (d) {
				$('#gallery').animate({
					 left: d*-galleryDeltaMove
					 }, timeTransition, function() {
						 $('#sectionCurrent').html(sezioniSteps+1);
					 // Animation complete.
				 });
			}
			$(".galleryContainer li").css("width",wGal);
		
			//
		}
		//### LIVELLI
		if(currentPage == 'livelli') {
			//Reinizializzo svuotando la gallery
			$("#levelShowGallery ul").html("");
			
			var index = INVENKTION.StorageManager.getItem("currentSection");
			var section = INVENKTION.LevelManager.getSection(parseInt(index));
			var num = INVENKTION.LevelManager.getSectionLevelCount(section);
			console.log("Numero livelli della sezione "+index+" : "+num);
			//setto il totale
			$('#levelTotal').html(num);
			for(var i=0; i<num; i++) {
				var lev = INVENKTION.LevelManager.getSectionLevel(section,i);
				var unlocked = INVENKTION.LevelManager.isLevelUnlocked(lev);
				var statusImage;
				var correctClass = "levelImage";
				if(unlocked) {
					statusImage = lev.immagine;
				}else {
					statusImage = lev.immagine;
					correctClass = "lockedLevel";
				}
				$("#levelShowGallery ul").append("<li><img class='"+correctClass+"' data-livello='"+i+"' src='"+statusImage+"'/><h1>Monsters "+i+"</h1></li>");
			}
			
			//BACK BUTTON
			$(".jsBackSezioni").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					$.mobile.changePage( "#sezioni");
				}
			});
			
			//Evento selezione gallery
			$(".levelImage").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					//estraggo l'indice dell'immagine della gallery corrente
					var index = $(this).attr('data-livello');
					console.log("livello selezionata: "+index);
					INVENKTION.StorageManager.setItem("currentLevel",index+"");
					$.mobile.changePage( "#canvas");
				}
			});
			var wGal = $(window).height()*0.6;
			$(".galleryContainer li").css("width",wGal);
			
			//IMPOSTO I BOTTONI PREV e NEXT
			var levelSteps = 0;//CURRENT STEP
			var galleryDeltaMove = wGal;//DI QUANTO SI DEVE MUOVERE
			var timeTransition = 200;//tempo di animazione Slider
			
			$('.paginatorLevelShowGallery .next').bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					if (levelSteps < (num-1)) {
						levelSteps++;
						//alert(sezioniSteps+" "+galleryDeltaMove);
						sliderMoveTo(levelSteps);
						//$('#levelCurrent').html(levelSteps+1);
					}
				}
			});
			$('.paginatorLevelShowGallery .prev').bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
					if (levelSteps > 0) {
						levelSteps--;
						sliderMoveTo(levelSteps);
						//$('#levelCurrent').html(levelSteps+1);
					}
				}
			});
			
			//Funzione per animare la gallery
			function sliderMoveTo (d) {
				$('#levelShowGallery').animate({
					 left: d*-galleryDeltaMove
					 }, timeTransition, function() {
					 // Animation complete.
					 $('#levelCurrent').html(levelSteps+1);
					 console.log(d+" "+galleryDeltaMove)
				 });
			}
			
			//Ridimensiono la LI in base all'altezza dello schermo
			
			$(".galleryContainer li").css("width",wGal);
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
	
