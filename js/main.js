// **** CONSTANTS
var chaptersTotalAct = [6,25,6,3];

// Alert for Arrays
function alertArray(array){
	var mycutArray = "";
	jQuery.each(array, function(index, value) {
		mycutArray += " cell"+index+" :"+value;
	});
	return mycutArray;
}

// Common Trac/Console Function
function consoleMsg(msg){
	console.log(msg);
}

// MAIN AUDIO
function mainAudioPause(){
	// Pause AUDIO
	document.querySelector("audio").pause();
}
function mainAudioPlay(){
	// Resume AUDIO
	document.querySelector("audio").play();
}

/***************************************************************** 
				MAIN APP NAVIGATION 
*****************************************************************/

var countChapters = 0;
var countActivity = 0;

// Var for Activity 1_18 to decide MAN/WOMAN
var myGender='female';

// ****** SHOW/HIDE BUTTONS ******
function homeShow(){		
	$("#homeBut").css('visibility','visible');
}
function homeHide(){		
	$("#homeBut").css('visibility','hidden');
}
function previousShow(){		
	$("#prevBut").css('visibility','visible');
}
function previousHide(){		
	$("#prevBut").css('visibility','hidden');
}
function nextShow(){		
	$("#nextBut").css('visibility','visible');
}
function nextHide(){		
	$("#nextBut").css('visibility','hidden');
}
function nextPrevHide(){		
	previousHide();
	nextHide();
}
function nextPrevShow(){		
	previousShow();
	nextShow();
}
function nextPrevHomeHide(){		
	previousHide();
	nextHide();
	homeHide();
}
function nextPrevHomeShow(){		
	previousShow();
	nextShow();
	homeShow();
}

// ****** UPDATE Navigation VARIABLES ******

function updateCountChapters(newValue){
	countChapters = newValue;
}
function updateCountActivity(newValue){
	countActivity = newValue;
}
function updateCountChapterActivity(newChapter,newActivity){
	updateCountChapters(newChapter);
	updateCountActivity(newActivity);
}

// ****** GLOBAL NEXT/PREVIOUS Handling ******

function showHidePrevNext(){
	consoleMsg("> showHidePrevNext 1 | countChapters: "+countChapters+" countActivity: "+countActivity);
	
	// Check if Chapter has 1 or more activities and if activities navigation is at the beggining or at the end
	var totalActChapt = chaptersTotalAct[countChapters];
	
	// ***** GLOBAL CAUSES
	
	// HOME PAGE or APP has been completed
	if(countChapters == -1 || countChapters == -2 || countChapters == -3 || countChapters == -4){
		previousHide();
		nextHide();
	} 
	// Chapter that has ONLY ONE PAGE
	else if(countActivity == 1 && totalActChapt == 1){
		previousHide();
		nextHide();
	} 
	// First Page of Chapter
	else if(countActivity == 0){
		previousHide();
		nextShow();
	} 
	// Last Page of Chapter
	else if(countActivity >= (totalActChapt-1)){
		previousShow();
		nextHide();
	} else {
		previousShow();
		nextShow();
	}
	
	// ***** Special cases NEXT/PREVIOUS
	
	// CHAPTER 0
	if(countChapters == 0){
		if(countActivity <= 1){
			nextPrevHide();
		}
	}	
	// CHAPTER 1
	else if(countChapters == 1){
		if(countActivity == 1){
			nextHide();
		} else if(countActivity > 1 && countActivity < 8){
			nextPrevHide();
		} else if(countActivity == 8){
			previousHide();
		} else if(countActivity == 12){
			nextHide();
		} else if(countActivity > 12 && countActivity < 16){
			nextPrevHide();
		} else if(countActivity == 16){
			previousHide();
		} else if(countActivity == 17){
			nextHide();
		}
	}
	
	// ***** Special cases HOME
	
	// If Intro Chapter [0] OR Home Page [-1] OR Application has finished [-2->-4] (animation gifs pages)
	if(countChapters == 0 || countChapters == -1 || countChapters == -2 || countChapters == -3 || countChapters == -4){
		homeHide();	
	// Special Case of Chapter's 1 Internal Activities
	} else if(countChapters == 1 && countActivity > 1 && countActivity < 8){
		homeHide();	
	// Special Case of Chapter's 1 Internal Activities
	} else if(countChapters == 1 && countActivity > 12 && countActivity < 16){
		homeHide();	
	} else {
		homeShow();
	}

	consoleMsg("> showHidePrevNext 2 | countChapters: "+countChapters+" countActivity: "+countActivity+" totalActChapt: "+totalActChapt);
}

// ****** LOAD PAGES ******
function loadPage(chapterN, activityN, goPrev){
	consoleMsg("> loadPage | chapter "+chapterN+" activity "+activityN);
	
	// Load MENU
	if(chapterN == -1){
		$("#contentFrame").attr("src", "home.html");
	} 
	// Load FINISH ANIMATIONS
	else if(chapterN == -2){
		// Application Completed
		// SCORM
		setCompleteEnd();
		$("#contentFrame").attr("src", "finishanimation1.html");
	}
	else if(chapterN == -3){
		$("#contentFrame").attr("src", "finishanimation2.html");
	}
	else if(chapterN == -4){
		$("#contentFrame").attr("src", "finishanimation3.html");
	}
	// Load Activity
	else {
		$("#contentFrame").attr("src", "navigation/"+chapterN+"_"+activityN+"/exercise.html");
	}
	
	//UPDATE NAVIGATION VARIABLES
	updateCountChapterActivity(chapterN,activityN);
	
	// IMPORTANT to be at the END of the func
	showHidePrevNext();
}

// ****** NEXT & PREVIOUS EVENTS ******

function assignChaptersNav(){
	consoleMsg("> assignChaptersNav")
	
	if(this.id == "prevBut"){
		loadPage(countChapters,(countActivity-1));	
	} else {
		loadPage(countChapters,(countActivity+1));
	}
}

/***************************************************************** 
					HOME
*****************************************************************/

function goHome(){
	
	consoleMsg("goHome > chaptersFinished: "+chaptersFinished);
	
	//******* Update Completed Chapters *******
	updateChapterCompletion();
	
	// Is Application Completed?
	var doILoadActivity = isTheAppCompleted();
	if(doILoadActivity){
		// Set Current Page the END ANIMATION
		updateCountChapterActivity(-2,0);
	} else {
		// Set Current Page the HOME PAGE / MAIN MENU
		updateCountChapterActivity(-1,0);
	}	
	
	// Load Home Page	
	loadPage(countChapters, countActivity);	
}

/***************************************************************** 
			COMPLETION OF CHAPTERS or APP
*****************************************************************/

//******* Update ChaptersFinished Array *******
function updateChapterCompletion(){
	// **** Fill chaptersCompleted Array ****
	for (i = 0; i < chaptersCompleted.length; i++) {
		
		// Suppose Chapter is completed
		chaptersFinished[i] = 1;
		
		for (j = 0; j < chaptersCompleted[i].length; j++) {
			if(chaptersCompleted[i][j] === 0){
				chaptersFinished[i] = 0;
				break;
			}				
		}
	}
}

//******* Used from HOME.HTML and check chapter is completed *******
function checkChapterCompletion(myChapter){	

	var isItComplete = false;
	
	if (chaptersFinished[myChapter] === 1){
		isItComplete = true;		
	}
	
	return isItComplete;
}

//******* Check if Application has been completed *******
function isTheAppCompleted(){
	
	var applicationEnded = true;
	
	$.each(chaptersFinished, function(index, value) {
		if(chaptersFinished[index] === 0){
			applicationEnded = false;
			// > break $.each
			return false;
		}				
	});

	return applicationEnded;
}

/***************************************************************** 
				RESUME APP/ACTIVITES 
*****************************************************************/

//******* RESUME when click the Menu Buttons
function resumeFromMenu(chapterNo){

	// Load relevant Intro page
	$.each(chaptersCompleted[chapterNo], function(index, value) {
		if(chaptersCompleted[chapterNo][index]==0){
			// Unless first page
			if(index === 0){
				updateCountChapterActivity(chapterNo,0);
			} else {
				updateCountChapterActivity(chapterNo,(index-1));
			}
			// > break $.each
			return false;
		}						   
	});
	
	loadPage(countChapters, countActivity);	
}

//******* RESUME when app is loaded (mainly handles Chapter 0 / Intro)
function initResumeChapterAct(){
	consoleMsg("> initResumeChapterAct | countChapters: "+countChapters+" countActivity: "+countActivity+" chaptersFinished: "+chaptersFinished+" | chaptersCompleted: "+alertArray(chaptersCompleted));
	
	//******* Update Completed Chapters *******
	updateChapterCompletion();
	
	
	// INTRO NOT COMPLETED
	if(chaptersFinished[0]==0){
		
		// Load relevant Intro page
		$.each(chaptersCompleted[0], function(index, value) {
			if(chaptersCompleted[0][index]==0){
				// Unless first page
				if(index === 0){
					updateCountChapterActivity(0,0);
				} else {
					updateCountChapterActivity(0,(index-1));
				}
				// > break $.each
				return false;
			}						   
		});
	}	
	// INTRO COMPLETED, so proceed to MAIN MENU (-1,0)
	else {
		// Is Application Completed?
		var doILoadActivity = isTheAppCompleted();
		if(doILoadActivity){
			// Set Current Page the END ANIMATION
			updateCountChapterActivity(-2,0);
		} else {
			// Set Current Page the MAIN MENU
			updateCountChapterActivity(-1,0);
		}			
	}
	
	consoleMsg("countChapters: "+countChapters+" countActivity: "+countActivity);
	
	// LOAD RELEVANT PAGE if Appliction is not Completed
	loadPage(countChapters, countActivity);		
}

/***************************************************************** 
				SAVING of Activities Completion
*****************************************************************/

// FUNCTION TO RUN When each ACTIVITY is Completed
function activateFor(){
	
	// Update array
	chaptersCompleted[countChapters][countActivity] = 1;
	
	// UPDATE SCORM
	if(lmsConnected){
		saveScormArrays();
	}

	// Update Cookie
	if(cookieMainJSON){
		cookieMainJSON.completedChapters[countChapters][countActivity] = chaptersCompleted[countChapters][countActivity];
		
		// SAVE CHANGES IN COOKIE
		saveCompletionMainCookie();
	}
	
	consoleMsg("> activateFor | alertArray(chaptersCompleted): "+alertArray(chaptersCompleted));
	consoleMsg("------------------------------------------------------------");
}

function saveCompletionMainCookie(){
	consoleMsg("> saveCompletionMainCookie");
	
	// SAVE CHANGES IN COOKIE
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieMainName,null);
		localStorage.setObject(myCookieMainName,cookieMainJSON)
	}
	else{
		$.removeCookie(myCookieMainName)
		$.cookie(myCookieMainName, cookieMainJSON, cookieMainLifetime);
	}	
}

/*****************************************************
				COOKIES FOR MAIN
*****************************************************/

//**** DYNAMIC ARRAYS
var chaptersCompleted = [[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0]];
var chaptersFinished = [0,0,0,0];

//DEBUG: var chaptersCompleted = [[1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1],[1,0,1]];
//DEBUG: var chaptersFinished = [1,1,1,0];


// Cookies Vars
var cookieMainJSON;
var myCookieMainName ='ccAmbassadormain';
var cookieMainLifetime = 365;


function initCookiesMain(){
	consoleMsg("InitCookiesMain > chaptersCompleted: "+alertArray(chaptersCompleted)+" ||| chaptersFinished: "+alertArray(chaptersFinished));
	
	var myBrowser = get_browser();

	if ((myBrowser=='Chrome')||(isiPad==true)) {
		if (localStorage.getItem(myCookieMainName)===null){	
			localStorage.setObject(myCookieMainName,{'completedChapters':[],'extraChapters':[]});
			cookieMainJSON = localStorage.getObject(myCookieMainName);
		}
		else{
			cookieMainJSON = localStorage.getObject(myCookieMainName);
		}
	}
	else{
		$.cookie.json = true;
		if ($.cookie(myCookieMainName)===null){		
			$.cookie(myCookieMainName, {'completedChapters':[],'extraChapters':[]}, cookieMainLifetime);
			cookieMainJSON = $.cookie(myCookieMainName);
		}
		else{
			cookieMainJSON = $.cookie(myCookieMainName);
		}
	}
	
	
	// **** Fill chaptersCompleted Array ****
	$.each(chaptersCompleted, function(index, value) {
		
		if(!cookieMainJSON.completedChapters[index]){
			consoleMsg("> initCookiesMain | cookieMainJSON.completedChapters NOT DEFINED");
			cookieMainJSON.completedChapters[index] = chaptersCompleted[index];
		} else {
			// FILL Chapters Completed
			consoleMsg("> initCookiesMain | cookieMainJSON.completedChapters FILLING");
			
			// Suppose Chapter is completed
			//chaptersFinished[index] = 1;
		
			$.each(chaptersCompleted[index], function(index2, value2) {				
				//if(cookieMainJSON.completedChapters[index][index2]!=0){
				chaptersCompleted[index][index2]=cookieMainJSON.completedChapters[index][index2];
				/*} else {
					chaptersFinished[index] = 0;
				}*/
			});			
		}		
		
    });
	
	//consoleMsg("InitCookiesMain > chaptersCompleted: "+alertArray(chaptersCompleted)+" ||| chapter5Array: "+alertArray(chapter5Array));
}

$(document).ready(function(){
	
	// > INIT [Scorm or Load Arrays]
	window.onbeforeunload = unloadHandler;
	window.onunload = unloadHandler;	
	window.top.onbeforeunload = function(){unloadHandler();}	
	window.top.onunload = function(){unloadHandler();}
	
	initScormCourse();	
	// < INIT //


	// HOME Button INIT
	$("#homeBut").click(goHome);
	// PREVIOUS Button INIT
	$("#prevBut").click(assignChaptersNav);					
	// NEXT Button INIT
	$("#nextBut").click(assignChaptersNav);

	//******* RESUME/LOAD relevant Activity *******
	initResumeChapterAct();

	
	//consoleMsg("HandleIntro > countChapters: "+countChapters+" countActivity: "+countActivity+" chaptersCompleted: "+alertArray(chaptersCompleted));
	
}); // End of $(document).ready
