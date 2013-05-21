/*
 * INVENKTION.SezioniShowManager
 * author: Marco Uberti 
 * date:   May 18, 2013
 * 
 * 		Manager che gestisce la pagina SEZIONI
 * 
 */
(function($, exports){
	
	//Metodi e variabili private

	//Con questo metodo riesco a intercettare quando una pagina sta per essere mostrata
	//e di conseguenza fare gli aggiornamenti alla UI del caso
	$(document).bind('pagebeforeshow', function(event){
		currentPage = $(event.target).attr("id");
		
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
					var ammountStars = 0; 
					if (stars > 0) {
						ammountStars = 1
					}
					if (stars > ((sec.livelli.length)*3)/2) {
						ammountStars = 2
					}
					if (stars == (sec.livelli.length)*3) {
						ammountStars = 3
					}
					el = document.createElement('span');
					el.innerHTML = '<h1 class="monsterTitle">'+stars+'/'+(sec.livelli.length)*3 +'</h1><img class="setStars" src="images/setStars'+ammountStars+'.png"/>';
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
							var ammountStars = 0; 
							if (stars > 0) {
								ammountStars = 1
							}
							if (stars > ((sec.livelli.length)*3)/2) {
								ammountStars = 2
							}
							if (stars == (sec.livelli.length)*3) {
								ammountStars = 3
							}
							el = document.createElement('span');
							el.innerHTML = '<h1 class="monsterTitle">'+stars+'/'+(sec.livelli.length)*3 +'</h1><img class="setStars" src="images/setStars'+ammountStars+'.png"/>';
							
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
		
	});

	//Il nostro oggetto da esporre
	var mod = {};

	//Espongo nel global object
	exports.INVENKTION.SezioniShowManager = mod;
})(jQuery, window);
	
