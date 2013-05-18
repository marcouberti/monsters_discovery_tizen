/*
 * INVENKTION.DrawCanvasManagr
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce il canvas di disegno
 * 
 */
(function($, exports){
	var debug = false;//utility variable
	var isMobile = true;//touch event or mouse events support
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
		ctx.save();
		
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
		
		ctx.restore();
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
		//TODO
		//Ridisegno il tr
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

	/*
	function drawImageOnCanvas() {//prova di disegna di una immagine sul canvas
		var imageObj = new Image();
	    imageObj.onload = function() {
	      //la devo centrare nel canvas
	      ctx.drawImage(imageObj, 100, 100, 300, 300);
	    };
	    imageObj.src = 'images/w3_monster3.png';
	}
	*/
	var level;
	var section;
	var originalImage;
	var trImage;
	//Il nostro oggetto da esporre
	var mod = {
	     setLevel: function(lev) {
	    	 level = lev;
	     },
	     getLevel: function() {
	    	 return level;
	     },
	     setSection: function(sec) {
	    	 section = sec;
	     },
	     getSection: function() {
	    	 return section;
	     },
		 initCanvas: function(){
			console.log("### INVENKTION initCanvas");
			//Prelevo la sezione e livello corrente
			var sectionindex = INVENKTION.LevelManager.getLastSectionUsed();
			var levindex = INVENKTION.LevelManager.getLastSectionLevelUsed(sectionindex);
			var section = INVENKTION.LevelManager.getSection(parseInt(sectionindex));
			var level = INVENKTION.LevelManager.getSectionLevel(section, parseInt(levindex));
			
			INVENKTION.DrawCanvasManager.setSection(section);
			INVENKTION.DrawCanvasManager.setLevel(level);
			
			//Salvo gli oggetti immagine del contorno e immagine completa
			originalImage = new Image();
			originalImage.onload = function() {};
		    originalImage.src = level.immagine;
		    trImage = new Image();
		    trImage.onload = function() {};
		    trImage.src = level.contorno;
		    
			//Setto le immagini di sfondo e i contorni giusti
			$(".imgBG").attr("src",level.immagine);
			$(".imgTR").attr("src",level.contorno);
			$(".canvas_bgContainer").css("background","url("+section.sfondo+") no-repeat fixed center center / cover");
			
			//Popolo la tavolozza colori
			var colori =level.colori;
			var numColori = colori.length;
			
			//nascondo tutti i colori prima
			for(var c=1; c<=5; c++) {
				$(".colours"+(c)).hide();
			}
			for(var c=0; c<numColori; c++) {
				var r,g,b;
				r = colori[c][0];
				g = colori[c][1];
				b = colori[c][2];
				//var colorEL = "<a href='#' onclick='javascript:INVENKTION.DrawCanvasManager.setBrushColor("+r+","+g+","+b+")' style='position:fixed; top:"+50*c+"px; left:10px;z-index:10001;'>Color "+(c+1)+"</a>";
				//$("#canvas").append(colorEL);
				
				//Setto il colore alle macchie della tavolozza
				$(".colours"+(c+1)).show();
				$(".colours"+(c+1)).css("background-color","rgb("+r+","+g+","+b+")");
				$('.colorsContainer').removeClass('maxColor'+c);
			}
			$('.colorsContainer').addClass('maxColor'+numColori);
			$("#canvascontainer").html("");

			
		    //Create a canvas that covers the entire screen
			canvas = document.createElement('canvas');
			document.getElementById('canvascontainer').appendChild(canvas);
			ctx = canvas.getContext("2d");
			/*
			var devicePixelRatio = window.devicePixelRatio || 1;
	        var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
		        ctx.mozBackingStorePixelRatio ||
		        ctx.msBackingStorePixelRatio ||
		        ctx.oBackingStorePixelRatio ||
		        ctx.backingStorePixelRatio || 1;
	        var ratio = devicePixelRatio / backingStoreRatio;
	        console.log("devicePixelRatio= "+devicePixelRatio);
	        console.log("backingStoreRatio= "+backingStoreRatio);
	        console.log("ratio= "+ratio);
		        
	        canvas.height = window.availableHeight/ratio;
			canvas.width = window.availableWidth/ratio;
			*/
			canvas.height = window.innerHeight;
			canvas.width = window.innerWidth;
			
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
			
			INVENKTION.TimerManager.start();
		 },
		 restartLevel: function(level) {
			 this.clearCanvas();
			 //Ridisegno il background in trasparenza
			 //uso la variabile privata level che contiene il livello
		 },
		 //input: r,g,b
		 setBrushColor : function(r,g,b) {
			 current_color = "rgb("+r+","+g+","+b+")";
			 INVENKTION.DrawCanvasManager.setBrushType('BRUSH');
		 },
		 //input "rgb(r,g,b)"
		 setBrushColor : function(value) {
			 current_color = value;
			 INVENKTION.DrawCanvasManager.setBrushType('BRUSH');
		 },
		 setBrushType: function(type) {
			 brush_type = type;
		 },
		 increaseBrushSize: function() {
			 brush_size += 5;
			 if(brush_size > 50) brush_size = 50;//non può andare oltre 50 il pennello
		 },
		 decreaseBrushSize: function() {
			 brush_size -= 5;
			 if(brush_size < 5) brush_size = 5;//non può andare sotto 5 il pennello
		 },
		 getBrushColor : function() {
			 return current_color;
		 },
		 getBrushType: function() {
			 return brush_type;
		 },
		 getImageData: function() {
			 //Prendo i dati dell'immagine, ma solo la parte centrale che mi interessa
			 var x = canvas.width/2 - canvas.height/2;
		     var y = 0;
		     var W = canvas.height;
		     var H = canvas.height;
			 var imgd = ctx.getImageData(x, y, W, H);
			 var pix = imgd.data;
			 return pix;
		 },
		 drawImage: function(imageObj) {
			 var x = canvas.width/2 - canvas.height/2;
		     var y = 0;
		     var W = canvas.height;
		     var H = canvas.height;
			 ctx.drawImage(imageObj, x, y, W, H);
		 },
		 clearCanvas: function() {
			 ctx.clearRect(0, 0, canvas.width, canvas.height);
		 },
		 executeTrap: function() {
			 //Eseguo una trappola in una posizione casuale (candeggina)
			 var x = canvas.width/2 - canvas.height/2;
		     var y = 0;
		     var W = canvas.height;
		     var H = canvas.height;
			 var randomX = Math.floor(Math.random()*W);
			 var randomY = Math.floor(Math.random()*H);
			 ctx.save();
			 ctx.globalCompositeOperation = "destination-out";
			 ctx.beginPath();
			 ctx.fillStyle="red";
			 ctx.arc(x+randomX,y+randomY,W/4,0,2*Math.PI);
			 ctx.fill();
			 ctx.restore();
			 INVENKTION.SoundManager.playSound('negative');
		 },
		 executeTrick: function() {
			 //Eseguo un trick (CONTORNI MAGICI)
			 var x = canvas.width/2 - canvas.height/2;
		     var y = 0;
		     var W = canvas.height;
		     var H = canvas.height;
		     //E ne ottengo un cerchio casuale corretto
		     ctx.save();
			 ctx.globalCompositeOperation = "destination-in";
			 ctx.drawImage(originalImage, x, y, W, H);
			 ctx.restore();
			 INVENKTION.SoundManager.playSound('positive');
		 },
		 checkUserDrawing: function() {//se è init vuol dire che sto calcolando la percentuale di base
			 var x = canvas.width/2 - canvas.height/2;
		     var y = 0;
		     var W = canvas.height;
		     var H = canvas.height;
		     
		     //Salvo la versione utente
		     var userRawData = ctx.getImageData(0, 0, canvas.width, H);
			 //var userRawPix = userData.data;
			 //Incollo sul disegno utente il contorno originale
			 ctx.drawImage(trImage, x, y, W, H);
			 //Salvo il disegno utente
			 var userData = ctx.getImageData(x, y, W, H);
			 var userPix = userData.data;
			 //Cancello la lavagna e ci incollo l'immagine completa originale
			 INVENKTION.DrawCanvasManager.clearCanvas();
			 ctx.drawImage(originalImage, x, y, W, H);
			 
			 //Esporto l'immagine originale
			 var originalData = ctx.getImageData(x, y, W, H);
			 var originalPix = originalData.data;
			 var totPixel = originalPix.length/4;
			 //Confronto le due immagini
			 var errori = 0;
			 for (var i = 0, n = originalPix.length; i < n; i += 4) {		
				 if( originalPix[i  ] != userPix[i] || originalPix[i+1 ] != userPix[i+1] || originalPix[i+2 ] != userPix[i+2]) {
					 errori = errori+1;
				 }
			    // i+3 is alpha (the fourth element)
			 }
			 //Cancello e ripristino l'immagine raw dell'utente
			 //INVENKTION.DrawCanvasManager.clearCanvas();
			 //ctx.putImageData(userRawData, 0, 0);
			 //Rilascio le risorse
			 userRawData = null;
			 userData = null;
			 userPix = null;
			 originalData = null;
			 originalPix = null;
			 //Mostro il risultato con un alert
			 var percentageError = (100*errori)/totPixel;
			 var percentage = parseInt(100 - percentageError);
			 //Prima di iniziare il gioco, vedo quale è la percentuale di base del livello corrente
			 //var basePercentage = level.basePercentage;
			 //console.log("PERC="+percentage+"BASE PERCENTAGE = "+basePercentage);
			 //return (100*(percentage-basePercentage))/(100-basePercentage);
			 console.log("percentage = "+percentage);
			 
			 var currLevel = INVENKTION.DrawCanvasManager.getLevel();
			 var currSection = INVENKTION.DrawCanvasManager.getSection();
			 
			 INVENKTION.LevelManager.setLevelBestResult(currLevel,percentage);
			 
			 if(percentage >= 85) {
				 INVENKTION.SoundManager.playSound('positive');
				 INVENKTION.LevelManager.setLevelStars(currSection,currLevel,"3");
				 console.log("3 star");
				 INVENKTION.LevelManager.unlockNextLevel(currLevel,currSection);
			 }
			 else if(percentage >= 80) {
				 INVENKTION.SoundManager.playSound('positive');
				 INVENKTION.LevelManager.setLevelStars(currSection,currLevel,"2");
				 console.log("2 star");
				 INVENKTION.LevelManager.unlockNextLevel(currLevel,currSection);
			 }
			 else if(percentage >= 75) {
				 INVENKTION.SoundManager.playSound('positive');
				 INVENKTION.LevelManager.setLevelStars(currSection,currLevel,"1");
				 console.log("1 star");
				 INVENKTION.LevelManager.unlockNextLevel(currLevel,currSection);
			 }
			 else {
				 INVENKTION.SoundManager.playSound('negative');
				 INVENKTION.LevelManager.setLevelStars(currSection,currLevel,"0");
				 console.log("bad result");
			 }
			 
			 return percentage;
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.DrawCanvasManager = mod;
})(jQuery, window);
	
