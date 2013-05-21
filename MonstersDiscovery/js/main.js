//Initialize function
var init = function () {
    $('.ui-btn-back').live('tap', function(event) {
    	console.log("OK cliccato EXIT YES");
    	if(event.handled !== true) {
    		event.handled = true;
	        var currentApp = tizen.application.getCurrentApplication();
	        currentApp.exit();
    	}
    });
    
    //ANIMAZIONI CSS3 su tutti gli elementi con classe "animatedButton"
    //Solo per gli elementi che dopo il click non reindirizzano ad una altra pagina
    //Altrimenti bisogna mettere il reindirizzamento dopo il termine dell'animazione.
    $(".animatedButton").live("tap",function(event) {
    	$(this).addClass('animating');
	});
    $(".animatedButton").live('webkitAnimationEnd', function(event){
    	$(this).removeClass('animating');
	});
    $(".trickTrapImg").live('webkitAnimationEnd', function(event){
    	//$(this).parent().removeClass('animatedTrickTrap');
    	$(this).parent().remove();
	});
 
	//Faccio partire la musica
    INVENKTION.SoundManager.playBackgroundMusic();
     
    console.log("init() called");
};
$(document).bind('pageinit', init);
