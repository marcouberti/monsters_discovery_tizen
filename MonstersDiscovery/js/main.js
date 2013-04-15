//Initialize function
var init = function () {
    $('div[data-role="page"]:first .ui-btn-back').bind("click", function(event) {
        var currentApp = tizen.application.getCurrentApplication();
        currentApp.exit();
    });
	//Faccio partire la musica
    INVENKTION.SoundManager.playBackgroundMusic();
    
    console.log("init() called");
};
$(document).bind('pageinit', init);
