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
	$(".trick").live("tap",function(event) {
    	if(event.handled !== true) {
    		event.handled = true;
    		INVENKTION.DrawCanvasManager.executeTrick();
    	}
	});
    $(".trap").live("tap",function(event) {
    	if(event.handled !== true) {
    		event.handled = true;
    		INVENKTION.DrawCanvasManager.executeTrap();
    	}
	});
    
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
		    		$('.showPainting').toggleClass('showHELP');
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
			$('.gamePause_next').live('tap', function(event) {
				//Restart
				if(event.handled !== true) {
		    		event.handled = true;
		    		console.log('Next');
		    		INVENKTION.PageShowManager.popUpClose();
		    		
		    		var currLevel = INVENKTION.DrawCanvasManager.getLevel();
		    		var nextLevel = INVENKTION.LevelManager.getNextLevel(currLevel);
		    		if(nextLevel == undefined) alert("non ci sono livelli successivi");
		    		else {
		    			if(INVENKTION.LevelManager.isLevelUnlocked(nextLevel)) {
		    				var nextLevelSection = INVENKTION.LevelManager.getLevelSection(nextLevel.codice);
		    				INVENKTION.DrawCanvasManager.setSection(nextLevelSection);
							INVENKTION.DrawCanvasManager.setLevel(nextLevel);
		    				INVENKTION.DrawCanvasManager.initCanvas();
		    			}else {
		    				alert("il livello successivo è locked");
		    			}
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
			$('.home_audioBtn').live('tap', function (event) {
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
			
			/*TUTORIAL*/
			var step = 1;
			$(".tutorialSlider img").live("tap", function (event) {
				if(event.handled !== true) {
					event.handled = true;
					var spostamento = $('.MS_popUp').width();
					if (step == 5) {
						INVENKTION.PageShowManager.popUpClose();
						step = 1;
						$('.tutorialSlider').css("left","0px");
						INVENKTION.TimerManager.resume();
					}else{
						$('.tutorialSlider').animate({
							left: step*-(spostamento)
						});
						step++;
					}
				}
			});
			//Inizializzo il canvas (che fa partire il tempo)
			INVENKTION.DrawCanvasManager.initCanvas();
		}
		
	});

	//Il nostro oggetto da esporre
	var mod = {};

	//Espongo nel global object
	exports.INVENKTION.CanvasShowManager = mod;
})(jQuery, window);
	
