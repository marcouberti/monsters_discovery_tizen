/*
 * INVENKTION.DrawCanvasManagr
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce il canvas di disegno
 * 
 */
(function($, exports){
	var debug = true;//utility variable
	var isMobile = false;//touch event or mouse events support
	var paint = false;//only for mouse events

	var canvas = null;
	var ctx = null;

	var prev_x = -1;
	var prev_y = -1;

	var current_color = "#F00";
	var brush_size = 15;
	var brush_type = 'BRUSH';//BRUSH , ERASER

	//Line from the last position to current position
	function drawLine(x, y) {
		ctx.lineWidth = brush_size;
		ctx.lineCap = 'round';//mub
		if(brush_type == 'BRUSH') {
			ctx.globalCompositeOperation = "source-over";
			ctx.strokeStyle = current_color;
		}else if(brush_type == 'ERASER') {
			ctx.globalCompositeOperation = "copy";
			ctx.strokeStyle = ("rgba(255,255,255,0)");
		}
		ctx.beginPath();
		ctx.moveTo(prev_x, prev_y);
		ctx.lineTo(x, y);
		ctx.stroke();
	}

	//Check if touch is valid for drawing line and draw the line
	function drawOnTouchMove(x, y) 
	{
		if(!isMobile && !paint) return;//mub per debug con mouse
		
		if (x || y) 
		{
			if ((prev_x === -1) || prev_y === -1) 
			{
				prev_x = x;
				prev_y = y;
			}
			drawLine(x, y);
			prev_x = x;
			prev_y = y;
		}
	}


	//When canvas is touched, save the coordinates into prev_x and prev_y variables
	function onTouchStart(event)
	{
		event.preventDefault();

		if(debug) {//da rimuovere al rilascio
			drawOnTouchMove(10,10);
			drawOnTouchMove(100,100);
			drawOnTouchMove(40,50);
			drawOnTouchMove(10,100);
		}
		
		var touchEvent, x, y;
		touchEvent = event.changedTouches[0];
		x = touchEvent.pageX;
		y = touchEvent.pageY;
		if (x || y) 
		{
			prev_x = touchEvent.pageX;
			prev_y = touchEvent.pageY;
		}
	}
	function onMouseStart(event)
	{
		event.preventDefault();
		var touchEvent, x, y;
		touchEvent = event;
		x = touchEvent.pageX - canvas.offsetLeft;
		y = touchEvent.pageY - canvas.offsetTop;
		if (x || y) 
		{
			prev_x = touchEvent.pageX - canvas.offsetLeft;
			prev_y = touchEvent.pageY - canvas.offsetTop;
		}
		paint = true;
	}

	//Draw a line segment when touch move event occurs
	function onTouchMove(event)
	{
		event.preventDefault();
		var touchEvent, x, y;
		touchEvent = event.changedTouches[0];
		x = touchEvent.pageX;
		y = touchEvent.pageY;
		drawOnTouchMove(x, y);
	}
	function onMouseMove(event)
	{
		event.preventDefault();
		if(!paint) return;
		var touchEvent, x, y;
		touchEvent = event;
		x = touchEvent.pageX - canvas.offsetLeft;
		y = touchEvent.pageY - canvas.offsetTop;
		drawOnTouchMove(x, y);
	}

	//Capture the touch end event
	function onTouchEnd(event)
	{
		event.preventDefault();
		var touchEvent;
		touchEvent = event.changedTouches[0];
	}
	function onMouseEnd(event)
	{
		event.preventDefault();
		paint = false;
		var touchEvent;
		touchEvent = event;
	}

	//touch cancelled
	function onTouchCancel(event)
	{
		event.preventDefault();
	}
	//touch cancelled
	function onMouseCancel(event)
	{
		event.preventDefault();
		paint = false;
	}

	function drawImageOnCanvas() {//prova di disegna di una immagine sul canvas
		var imageObj = new Image();
	    imageObj.onload = function() {
	      //la devo centrare nel canvas
	      ctx.drawImage(imageObj, 100, 100, 300, 300);
	    };
	    imageObj.src = 'images/w3_monster3.png';
	}

	//Il nostro oggetto da esporre
	var mod = {
		 initCanvas: function(){
			console.log("### INVENKTION initCanvas");
			if(isMobile) {
				document.addEventListener("touchstart", onTouchStart, false);
				document.addEventListener("touchmove", onTouchMove, false);
				document.addEventListener("touchend", onTouchEnd, false);
				document.addEventListener("touchcancel", onTouchCancel, false);
			}else{
				document.addEventListener("mousedown", onMouseStart, false);
				document.addEventListener("mousemove", onMouseMove, false);
				document.addEventListener("mouseup", onMouseEnd, false);
				document.addEventListener("mouseleave", onMouseCancel, false);
			}

		    //Create a canvas that covers the entire screen
			canvas = document.createElement('canvas');
			canvas.height = screen.availHeight;
			canvas.width = screen.availWidth;
			document.getElementById('canvas').appendChild(canvas);
			ctx = canvas.getContext("2d");
		 },
		 //input: colorExadecimal (#FF0000)
		 setBrushColor : function(colorExadecimal) {
			 current_color = colorExadecimal;
		 },
		 setBrushType: function(type) {
			 brush_type = type;
		 },
		 getBrushColor : function() {
			 return current_color;
		 },
		 getBrushType: function() {
			 return brush_type;
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.DrawCanvasManager = mod;
})(jQuery, window);
	