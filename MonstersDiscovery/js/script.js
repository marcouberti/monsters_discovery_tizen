
// JavaScript Document

var mainHeight = 1;
function initVar () {
	mainHeight = $(window).height();
	$('.imgContainer').css('width',mainHeight);
	$('.paletteContainerInn').css('margin-top',(mainHeight*-0.7)/2);
	
	$(document).bind("click",function(event){
		if($(event.target).attr("class") == 'palette') {
			alert("ho cliccato sulla TAVOLOZZA");
			if(INVENKTION.DrawCanvasManager.getBrushType() == 'BRUSH') {
				INVENKTION.DrawCanvasManager.setBrushType('ERASER');
			}else {
				INVENKTION.DrawCanvasManager.setBrushType('BRUSH');
			}
			
			INVENKTION.DrawCanvasManager.setBrushColor('#00F');
		}
	});
} 

$(document).ready(function() {
	initVar ();
	
});