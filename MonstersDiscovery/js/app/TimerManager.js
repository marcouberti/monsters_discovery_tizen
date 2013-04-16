/*
 * INVENKTION.TimerManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce il timer
 * 
 */
(function($, exports){
	
	//Modello che contiene i tag fino ad ora ricevuti (una sorta di cache per i miei controlli e matching)
	var worker;
	var isPausing = false;

	//Il nostro oggetto da esporre
	var mod = {
		 start : function() {
			 worker=new Worker("js/app/webworker/timer.js");
			 worker.onmessage=function(event){
				 var secondRemaining = event.data;
				 $("#timer").html(secondRemaining);
				 
				 if(secondRemaining == 0) {
					 INVENKTION.TimerManager.stop();
					 INVENKTION.DrawCanvasManager.checkUserDrawing();
				 }
			 }; 
		 },
		 notifyPause: function(){
			worker.postMessage(isPausing) ;
		 },
		 resume: function() {
			 isPausing = false;
			 INVENKTION.TimerManager.notifyPause();
		 },
		 pause: function() {
			 isPausing = true;
			 INVENKTION.TimerManager.notifyPause();
		 },
		 stop : function() {
			 worker.terminate();
		 },
		 isPausing: function(){
			 return isPausing;
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.TimerManager = mod;
})(jQuery, window);
	