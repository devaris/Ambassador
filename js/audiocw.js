var audioRedirection = '../../';

// **** Audio Element ****
function removeAudioElement() {

	var audio = document.getElementsByTagName("audio")[0];
	
	/*
	alert("REMOVE audio.currentTime: "+audio.currentTime)	
	alert("REMOVE audio.duration: "+audio.duration)
	*/
	
	if(audio.currentTime){
		audio.pause();
		audio.currentTime = 0;
	}
	
	document.body.removeChild(audio);
	
	//alert("REMOVE audio.duration: "+audio.duration)	
}
function audioPlay(audiofile) {
	
	// Create Audio Element
	var audio = document.createElement("audio");
	//document.body.appendChild(audio);

	/* Loading Audio
	audio.load();
	audio.preload = "auto"
	*/
	audio.src = audioRedirection+"audio/"+audiofile+".mp3";
	
	
	
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0;
	}
}

function audioCorrect() {

	// Create Audio Element
	var audio = document.createElement("audio");
	//document.body.appendChild(audio);

	/* Loading Audio
	audio.load();
	audio.preload = "auto"
	*/
	audio.src = audioRedirection+"audio/correct.mp3";		
	
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0;
	}
}


function audioWrong() {

	// Create Audio Element
	var audio = document.createElement("audio");
	//document.body.appendChild(audio);

	/* Loading Audio
	audio.load();
	audio.preload = "auto"
	*/
	audio.src = audioRedirection+"audio/warning.mp3";	
	
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0;
	}
}
