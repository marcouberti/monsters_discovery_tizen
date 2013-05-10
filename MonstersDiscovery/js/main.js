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
    
    console.log("init() called");
};
$(document).bind('pageinit', init);
