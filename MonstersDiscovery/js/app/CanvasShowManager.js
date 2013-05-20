/*
 * INVENKTION.CanvasShowManager
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
		
		//### CANVAS
		if(currentPage == 'canvas') {
			mainHeight = $(window).height();
			$('.imgContainer').css('width',mainHeight);
			//$('.paletteContainerInn').css('margin-top',(mainHeight*-0.7)/2);
			
			$(".tavcol").live("tap",function(event) {
				if(event.handled !== true) {
		    		event.handled = true;
		    		INVENKTION.DrawCanvasManager.setBrushColor($(this).css("background-color"));
					INVENKTION.SoundManager.playSound('plaf');
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
			//SHOW HELP
			$(".showPaintBtn").bind('tap',function(event){
				if(event.handled !== true) {
		    		event.handled = true;
		    		$('.showPainting').toggle();
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
					INVENKTION.DrawCanvasManager.setBrushType('ERASER');
					INVENKTION.SoundManager.playSound('plaf');
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
			
			//Inizializzo il canvas (che fa partire il tempo)
			INVENKTION.DrawCanvasManager.initCanvas();
			$('.brushSize').html('15');// TO DO MUB - LEGGERE DIRETTAMENTE IL VALORE DEL PENNELLO DI DEFAULT /////////////////////
		}
		
	});

	//Il nostro oggetto da esporre
	var mod = {};

	//Espongo nel global object
	exports.INVENKTION.CanvasShowManager = mod;
})(jQuery, window);
	
