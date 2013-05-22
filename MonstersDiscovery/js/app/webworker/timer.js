var i=8;
var isPausing = false;
this.addEventListener('message', function(msg) {
	isPausing = msg.data;
}, false);

function timedCount()
{
	if(!isPausing) {//se non sono in pausa scalo il tempo, altrimenti aspetto un secondo
		i=i-1;
		postMessage(i);
	}
	setTimeout("timedCount()",1000);
}

timedCount(); 