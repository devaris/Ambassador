// CCS Params
var scorm = pipwerks.SCORM;
scorm.version = "2004";

var lmsConnected = false;
var unloaded = false;
var hasSCORMscore = false;


function traceMsg(msg){
	//alert(msg);
	//console.log(msg);
}

/***** PER INDIVIDUAL APP **************************/

// SCORING
//var chaptersTotalScore = [0,0,0,0,0,0,0,0,0];

//var chaptersTotalScore = [1,1,1,1,1,1,1,1,1];
var chaptersTotalScore = [0,0,0,0,0,0,0,0,0];

function resetEx(){
	if (chaptersTotalScore[currentEx] == 0){
		doReset = true;
	}
	
	traceMsg("doReset: "+doReset+"| currentEx :"+currentEx+"| chaptersTotalScore :"+chaptersTotalScore);
	
	return doReset;
}

function setLocation(myLoc){
	// Location / Bookmark	
	var bookmark = scorm.set("cmi.location", myLoc);
}

function saveScormArrays(){
	var tempString="";	
	
	$.each(chaptersTotalScore, function(index, value) {
		tempString += value+",";			
    });
	
	var savedData = scorm.set("cmi.suspend_data", tempString);
	
	// SAVE ALL INIT
	scorm.set("cmi.exit", "suspend");
	scorm.save();
	
	//alert("saveScormArrays > savedData: "+savedData+" tempString: "+tempString);
}

function fillScormArrays(){
	
	// Suspend_Data
	var savedData = scorm.get("cmi.suspend_data");
	
	var tempArray=savedData.split(',');
	
	$.each(chaptersTotalScore, function(index, value) {
			chaptersTotalScore[index] = parseInt(tempArray[index]);
    });	
	
	//alert("fillScormArrays > chaptersTotalScore: "+chaptersTotalScore);
}


function calculateScore(individualScore){
	
	var totalScore = 0;
	if (individualScore>0){
		chaptersTotalScore[currentEx] = individualScore;	
	}
	
	// **** Fill chaptersCompleted Array ****
	$.each(chaptersTotalScore, function(index, value) {
		totalScore = totalScore+value;
		//console.log("totalScore: "+totalScore+" / index: "+index+" / value: "+value)
    });
	
	totalScore = Math.round((totalScore/chaptersTotalScore.length)*100);
	setScormScore(totalScore);
	saveScormArrays();
	setLocation(currentEx);
	
	traceMsg("CalculateScore > currentEx: "+currentEx+" | individualScore: "+individualScore+" | totalScore: "+totalScore + " | chaptersTotalScore: "+chaptersTotalScore);
	//alert("CalculateScore > currentEx: "+currentEx+" | individualScore: "+individualScore+" | totalScore: "+totalScore + " | chaptersTotalScore: "+chaptersTotalScore);
}


/***** DEFAULT ************************************/

// SCORING
function setScormScore(score){
	if(lmsConnected){
		/**** SET SCORM Score *****/
		if(score<0){
			score = 0;
		} else if(score==100){
			var success = scorm.set("cmi.success_status", "passed");	
		}
		var savedScore = scorm.set("cmi.score.raw", Math.round(score));
		var savedScaledScore = scorm.set("cmi.score.scaled", (Math.round(score) / 100));
	}
	
}

//INIT
function initCourse(){
	//alert("initCourse");
	//scorm.init returns a boolean
	lmsConnected = scorm.init();
	
	//If the scorm.init function succeeded...
	if(lmsConnected){	

		/**** SET COMPLETION Status (“completed”, “incomplete”, “not attempted”, “unknown”, RW) *****/
		var completionStatus = scorm.get("cmi.completion_status");
		traceMsg("get completionStatus: "+completionStatus);	
		
		//If the course has already been completed...
		if(completionStatus == "completed"){
			
			//scorm.set("cmi.exit", "logout");
			
			//...let's display a message and close the browser window
			traceMsg("You have already completed this course. You do not need to continue.");
		
		} else if (completionStatus == "unknown") {
			scorm.set("cmi.exit", "suspend");
			scorm.set("cmi.completion_status", "incomplete");
			traceMsg("completion_status > Set incomplete");
			
		}
		
		/**** SET SUCCESS Status (“passed”, “failed”, “unknown”, RW) *****/
		var successStatus = scorm.get("cmi.success_status");
		traceMsg("get successStatus: "+successStatus);	

		if(successStatus == "passed"){
			
			traceMsg("You have already passed this course. You do not need to continue.");
		
		} else if (successStatus == "unknown" || successStatus == "failed") {
			scorm.set("cmi.success_status", "failed");
			traceMsg("successStatus > Set failed");
		}
		
		
		/**** SET Default Score *****/
		var scormMinScore = scorm.set("cmi.score.min", "80");
		var scormMaxScore = scorm.set("cmi.score.max", "100");
		
		/**** GET SCORM Score *****/
		var savedScore = scorm.get("cmi.score.raw");
		var savedScaledScore = scorm.get("cmi.score.scaled");
		var score;
		
		if (savedScore == "unknown" || savedScore == "" || savedScore == "null") {
			score = 0;			
		} else {
			score = parseInt(savedScore);
			//score = savedScore*1;
		}
		
		// SET Scorm SCORE
		setScormScore(score);
		
		traceMsg("INIT GET > score: "+score+" | savedScore: "+savedScore+" | savedScaledScore: "+savedScaledScore+" | scormMinScore: "+scormMinScore+" | scormMaxScore: "+scormMaxScore);
				
		// Suspend_Data
		var savedData = scorm.get("cmi.suspend_data");
		traceMsg("INIT GET > savedData: "+savedData);
		
		if (savedData == "unknown" || savedData == "" || savedData == "null") {
			saveScormArrays();
			traceMsg("Suspend_data Nothing to Load");
		} else {
			fillScormArrays();	
			traceMsg("Suspend_data Loaded");
		}		
		traceMsg("INIT Suspend_Data > "+savedData);
		

		
		// Location / Bookmark	
		var bookmark = scorm.get("cmi.location");
		
		traceMsg("INIT GET> bookmark: "+bookmark);
		
		if (bookmark == "unknown" || bookmark == "" || bookmark == "null") {
			scorm.set("cmi.location", "index.html");
		} 			
		traceMsg("Location> bookmark: "+bookmark);

		
		/**** Now let's get the username from the LMS 
		var userName = scorm.get("cmi.learner_name");
		var userId = scorm.get("cmi.learner_id");	
		traceMsg("userName: "+userName+" userId: "+userId);
		****/
		
		// SAVE ALL	
		scorm.save();

	//If the course couldn't connect to the LMS for some reason...
	
	} else {
		
		//initCookiesMain();		
		traceMsg("Error: Course could not connect with the LMS");	
	}
	
	

}

// FUNCTIONS

function setCompleteEnd(){
	//alert("setCompleteEnd: "+totalScore);
	
	if(lmsConnected){
		var completed = scorm.set("cmi.completion_status", "completed");
		//var success = scorm.set("cmi.success_status", "passed");
		
		scorm.set("cmi.exit", "normal");
		scorm.save();
		scorm.quit();
		traceMsg("!! setCompleteEnd");
	}
}

function setComplete(){
	if(lmsConnected){
		var completed = scorm.set("cmi.completion_status", "completed");
		/*var success = scorm.set("cmi.success_status", "passed");*/
		
		scorm.set("cmi.exit", "suspend");
		scorm.save();
		traceMsg(":) setComplete");
	}
}

function setInComplete(){
	
	if(lmsConnected){
		
		var success = scorm.set("cmi.completion_status", "incomplete");
		scorm.set("cmi.exit", "suspend");
		scorm.save();

		traceMsg(":| setInComplete");
	}
}

function unloadHandler(){

	traceMsg("closing.connection.onbeforeunload | onunload");
	
	if(!unloaded){
		traceMsg("Save on Quit");
		scorm.set("cmi.exit", "suspend");
		scorm.save(); //save all data that has already been sent
		scorm.quit(); //close the SCORM API connection properly
		unloaded = true;
	}
}

/* MOVED to main.js $(document).ready
$(document).ready(function() {
	window.onbeforeunload = unloadHandler;
	window.onunload = unloadHandler;
	initCourse();
});
*/