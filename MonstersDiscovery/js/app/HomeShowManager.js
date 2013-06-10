/*
 * INVENKTION.HomeShowManager
 * author: Marco Uberti 
 * date:   May 18, 2013
 * 
 * 		Manager che gestisce la pagina SEZIONI
 * 
 */
(function($, exports){
	
	$(".home_btn1").live('tap', function (event) {
		if(event.handled !== true) {
    		event.handled = true;
    		$.mobile.changePage( "#sezioni");
		}
	});
	$(".home_btn3").live('tap', function (event) {
		if(event.handled !== true) {
    		event.handled = true;
    		$.mobile.changePage( "#atelier");
		}
	});
	$(".home_creditsBtn").live("tap", function (event) {
		if(event.handled !== true) {
			event.handled = true;
			//INVENKTION.PageShowManager.popUpStart($('#MS_credits').html(),'MS_sectionUnlock','MS_gamePaused');
			INVENKTION.PageShowManager.popUpStart($('#MS_credits').html());
		}
	});
	
	$(".JS_quit").live("tap", function (event) {
		if(event.handled !== true) {
			event.handled = true;
			INVENKTION.PageShowManager.popUpStart($('#MS_quit').html());
		}
	});
	$(".home_logoInvenktion, .credits_Invenktion").live("tap", function (event) {
		if(event.handled !== true) {
			event.handled = true;
    		location.replace("http://www.invenktion.com");
		}
	});
	
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

	//Con questo metodo riesco a intercettare quando una pagina sta per essere mostrata
	//e di conseguenza fare gli aggiornamenti alla UI del caso
	$(document).bind('pagebeforeshow', function(event){
		currentPage = $(event.target).attr("id");
		
		//### HOME
		if(currentPage == 'home') {}
		
	});

	//Il nostro oggetto da esporre
	var mod = {};

	//Espongo nel global object
	exports.INVENKTION.HomeShowManager = mod;
})(jQuery, window);
	
