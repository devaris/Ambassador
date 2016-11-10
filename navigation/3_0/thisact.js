// JavaScript Document
var theCurrDrag = "";
var objPositions = {};
var dndCookie = 'AmbassadorEx3_0';
var cookieLifetime = 365;

var ua = navigator.userAgent;
var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);

var allObg = 0;


Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

function get_browser() {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null)
	M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    return M[0];
}

function get_browser_version() {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null)
	M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    return M[1];
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
	if (obj.hasOwnProperty(key))
	    size++;
    }
    return size;
};

function clearCookie(){
	//alert("clearCookie");
	
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(dndCookie,objPositions);
	}
	else{
		if ($.cookie(dndCookie)===null){		
		}
		else{
			cookieJSON = $.cookie(dndCookie)
		}
		$.removeCookie(dndCookie);
	}	
}


/* DnD CODE */
var corrArray = [1,1,2];


function dndFunctions(){
	// Set objects that are Dragged
    $(".drags  span").draggable({
		revert: "invalid",
		start: function(event, ui) {
			theCurrDrag = $(this);
			
		},
		/*
		stop : function (event, ui) {
		 theCurrDrag = $(this);
		}
		*/
    });

    // Set drop Elemnts
	$(".drop").droppable({
		tolerance: 'touch',
		drop: function(event, ui) {
			
			// The drag element(s)
			var theDraggedId = Number($(theCurrDrag).attr("id").replace("drag", ""));
			// The drop element(s)
			var theTargetId = Number($(this).attr("id").replace("drop", ""));
			
			// Check the JQuery data values that drag & drop elements might have in common
			if ($(theCurrDrag).data("myAnswer") == $(this).data("myAnswer")) {				

				// Return the DRAG Object to its initial position
				theCurrDrag.offset({top: ($(this).offset().top - 3), left: ($(this).offset().left - 0)});
				//Disable it
				theCurrDrag.draggable('disable');
				// Hide it
				theCurrDrag.css("display", "none");
			
				// Reset the DRAG position to be saved in Cookies as completed (and not show on Init)
				objPositions[theCurrDrag.attr("id")] = 0;

				// Save to COOKIES
				var myBrowser = get_browser();
				if ((myBrowser=='Chrome')||(isiPad==true)) {
					//localStorage.setObject(dndCookie,null);
					localStorage.setObject(dndCookie, objPositions);
				} else {
					$.cookie(dndCookie, objPositions, {expires: cookieLifetime});
				}
				
				// Well Done!
				audioCorrect();			
				allObg++;
				
				// Show the correct ANSWER
				$("#answer"+theTargetId).show();
				$("#arrow"+theTargetId).show();
				
				// If all elements are Correct the Activity is completed
				if(allObg === 3){
					audioPlay("completed");
					
					// COMPLETED MAIN ACTIVITY 
					window.parent.activateFor();
				}
			
			}
			// DRAGS & DROPS do not match
			else {
				// Return the DRAG Object to its initial position	
				theCurrDrag.animate({left: 0, top: 0}, 200, "linear");
				
				audioWrong();
			}
		// drop Event ended	
		}
	// droppable Event ended	
    });	
}

$(document).ready(function() {	
	
	// Keep initial Positions of DRAGS
	$(".drags  span").each(function(index, element) {
		objPositions[$(this).attr("id")] = $(this).offset();
    });	
	
	// Assign DND Functionality
	dndFunctions();
	
	// Fill Drags & Drops elements with Correct Answers
	for(i=0; i<corrArray.length;i++){
		
		$("#drag"+(i+1)).data({"myAnswer":corrArray[i]});
		$("#drop"+(i+1)).data({"myAnswer":corrArray[i]});
	}	
	
	//Hide the answers
	$(".theAnswers li").hide();
	$(".theArrows div").hide();
	
/**********************
		COOKIES
*********************/
	
	//then ready cookies
    $.cookie.json = true;
	
	// RESET
	var doIreset=false;
	try {
		doIreset=window.parent.resetEx();
	}
	catch(e){
	}
	
	if (doIreset==true){
		clearCookie();
	}
	
    var myBrowser = get_browser();
    if ((myBrowser=='Chrome')||(isiPad==true)) {
		if (localStorage.getItem(dndCookie) === null) {
			localStorage.setObject(dndCookie, objPositions);
		} else {
			objPositions = localStorage.getObject(dndCookie);
		}		
    } else {	
		//cookie for dnd
		if ($.cookie(dndCookie) == null) {
			$.cookie(dndCookie, objPositions, {expires: cookieLifetime});
		} else {
			objPositions = $.cookie(dndCookie);
		}		
    }
	
	$(".drags span").each(function(index, element) {
		// If not completed
		if (typeof objPositions[$(this).attr("id")] == "object") {
			//$(this).offset(objPositions[$(this).attr("id")]);
		} else {
			// Hide DRAG that was completed
			$(this).css("visibility", "hidden");
			$(this.parentNode).css("cursor", "auto");
			$(this).draggable('disable');
			currDrag = Number($(this).attr("id").replace("drag", ""));
			//currDrag = corrArray[currDrag-1];
			
			// Objects that were correct
			allObg++
			
			// Show the Answer
			$("#answer"+currDrag).show();
			$("#arrow"+currDrag).show();

			// If all elements are Correct the Activity is completed 
			if(allObg === 3){
				
				// COMPLETED MAIN ACTIVITY 
				window.parent.activateFor();
			}
		}
	// FOR ENDED
	});
	
// DOCUMENT READY ENDED
});