/*
 * INVENKTION.LivelliShowManager
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
						//el.innerHTML = lev.nome+" stars : "+stars;
						el.innerHTML = '<h1 class="monsterTitle">'+lev.nome+'</h1><img class="setStars" src="images/setStars'+stars+'.png"/>';
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
		
	});

	//Il nostro oggetto da esporre
	var mod = {};

	//Espongo nel global object
	exports.INVENKTION.LivelliShowManager = mod;
})(jQuery, window);
	
