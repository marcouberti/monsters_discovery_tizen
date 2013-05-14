//Initialize function
var init = function () {
    $('.ui-btn-back').bind('tap', function(event) {
    	if(event.handled !== true) {
    		event.handled = true;
	        var currentApp = tizen.application.getCurrentApplication();
	        currentApp.exit();
    	}
    });
	//Faccio partire la musica
    INVENKTION.SoundManager.playBackgroundMusic();
    
    //Setto il PopUp
    function popUpStart (msg) {
    	$('.MS_popUpContainer').show();
    	$('.MS_popUpInn').html(msg);
    } 
    
    console.log("init() called");
};
$(document).bind('pageinit', init);
