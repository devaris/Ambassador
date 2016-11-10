// JavaScript Document
var currTar = "";
var thenext = 1;
var allObjs = 0;
var totalQs = 4;

var groupDefinedArray = [5,11,3,3,4,4];
var groupConstantArray = [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,2,2,2,3,3,3,4,4,4,4,5,5,5,5];
var groupFilledArray = [0,0,0,0,0,0];

var cTl = {};
cTl.crosswrdCookie = 'AmbassadorEx2_1';

cTl.cookieLifetime = 365;
cTl.elements = [];
cTl.crosswrd = 'gdentonsueomaintateackaronaste';
cTl.crosswrdData = {};
cTl.completedPieces = 0;

function startAnimation(){
	$(".subtitle").removeClass("animated");
	$(".subtitle").removeClass("bounceInLeft");
	$(".crossDiv").removeClass("animated");
	$(".crossDiv").removeClass("fadeIn");
	$(".subtitle").animate({
		 left: "261px",
   		 top: "268px"
	    }, 0, function() {
		// Animation complete.
	    });
	$(".subtitle").addClass("solvedAnimation");
	$(".crossDiv").animate({
		 left: "-136px",
   		 top: "295px"
	    }, 0, function() {
		// Animation complete.
	    });
	$(".crossDiv").addClass("solvedAnimation");
	$("#fefo0").css("display", 'block');
	$("#fefo1").css("display", 'block');
	$("#fefo2").css("display", 'block');
	$("#fefo3").css("display", 'block');
	$(".extraInfo").css("display", 'block');
	$("#fefo0").addClass("animated fadeIn");
	$("#fefo1").addClass("animated fadeIn");
	$("#fefo2").addClass("animated fadeIn");
	$("#fefo3").addClass("animated fadeIn");
	$(".extraInfo").addClass("animated bounceIn");
}


function clearCookie(){
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(cTl.crosswrdCookie,{});
	}
	else{
		if ($.cookie(cTl.crosswrdCookie)===null){		
		}
		else{
			cookieJSON = $.cookie(cTl.crosswrdCookie)
		}
		$.removeCookie(cTl.crosswrdCookie);
	}	
}

$(document).ready(function() {
			   
	var doIreset=false;
	try {
		doIreset=window.parent.resetEx();
	}
	catch(e){
	}
	
	if (doIreset==true){
		clearCookie();	
	}
	// LINK TO OPEN LETTER
	$("#actLetter").animate({"opacity": "toggle"});
	$(".goToLetter").click(function(){
		//$("#actLetter").fadeToggle( "slow", "linear" );
		$("#actLetter").animate({
			opacity: 'toggle'
		});
	});  
	// LINK TO OPEN LETTER
	
	
	$(".extraInfo").css("display", 'none');
	
	$('input.crosswrd').keypress(function(event) {
	
		if (event.which == 8 || event.which == 0) {
			//event.preventDefault();
			$(this).val("");
			cTl.crosswrdData[$(this).attr("id")] = $(this).val();
			$(this).css("color", "#000");
			var tmpId = Number($(this).attr("id").replace("inp", ""));
			
			//go to previous
			tmpId--;
			
			try {
				// When delete move to previous letter
				$("#" + "inp" + tmpId).focus();
			} catch (err) {
			//focus nowhere!
			}
		}
		else {
			//alert(event.which);		
			
			$(this).val(String.fromCharCode(event.which));
			var tmpId = Number($(this).attr("id").replace("inp", ""));
			
			
			//alert("$(this).val().toUpperCase(): "+$(this).val().toUpperCase()+"$(# + hinp + tmpId).val()"+$("#" + "hinp" + tmpId).val())
	
			
			if ($(this).val().toUpperCase() == $("#" + "hinp" + tmpId).val()) {
			

				$(this).css("color", "#F00");
				
				audioCorrect();
				
				// Correct so add to the word group one point.
				groupFilledArray[groupConstantArray[tmpId]]++;
				
				// disable current input text
				$("#inp"+ tmpId).unbind();
				$("#inp"+ tmpId).attr('disabled', 'disabled');

				
				if (groupFilledArray[groupConstantArray[tmpId]] == groupDefinedArray[groupConstantArray[tmpId]]){
					
					$("#input" + groupConstantArray[tmpId]).css("visibility", "hidden");
					$("#img"+ groupConstantArray[tmpId]).css("visibility", "hidden");
					$("#answer"+ groupConstantArray[tmpId]).css("visibility", "visible");
				}
				
				allObjs++;
				if(allObjs == 30){
				// COMPLETED MAIN ACTIVITY 
					window.parent.activateFor();
				}			
			} 
			else {

				$(this).css("color", "#000");
				audioWrong();
			}
			
			cTl.crosswrdData[$(this).attr("id")] = $(this).val();
			
			var myBrowser = get_browser();
			if (myBrowser == 'Chrome') {
				localStorage.setObject(cTl.crosswrdCookie, cTl.crosswrdData);
			} else {
				$.cookie(cTl.crosswrdCookie, cTl.crosswrdData, {expires: cTl.cookieLifetime});
			}
			
			tmpId++;
			try {
				$("#" + "inp" + tmpId).focus();
			} catch (err) {
			//focus nowhere!
			}
		}
		
		
	});
	//end KeyPress

    $('input.crosswrd').keyup(function(event) {

		if (event.which == 8) {
			//event.preventDefault();
		} else {
			var tmpChecks = $('input.crosswrd').length;
			var tmpSolution = "";
			for (var i = 0; i < tmpChecks; i++) {
				tmpSolution = tmpSolution + $('input.crosswrd')[i].value;
			}
			if (tmpSolution.toUpperCase() == cTl.crosswrd) {
				/*
				$("span.crossText").css("visibility", "visible");
				$('input.crosswrd').unbind();
				$("input.crosswrd").attr('disabled', 'disabled');
				*/
				//startAnimation();
			}
		}
		
		
    });
	// end KeyUp

    //then ready cookies
    $.cookie.json = true;
    var myBrowser = get_browser();
	 //cookie for crossword		
    if (myBrowser == 'Chrome') {
		if (localStorage.getItem(cTl.crosswrdCookie) === null) {
			var tmpChecks = $('input.crosswrd').length;
			for (var i = 0; i < tmpChecks; i++) {
				cTl.crosswrdData["inp" + i] = "";
			}
			localStorage.setObject(cTl.crosswrdCookie, cTl.crosswrdData);
			cTl.crosswrdData = localStorage.getObject(cTl.crosswrdCookie);
		}
		else {
			cTl.crosswrdData = localStorage.getObject(cTl.crosswrdCookie);
			var tmpChecks = $('input.crosswrd').length;
			var tmpSolution = "";
			for (var i = 0; i < tmpChecks; i++) {
				$("#" + "inp" + i).val(cTl.crosswrdData["inp" + i]);
				tmpSolution = tmpSolution + $("#" + "inp" + i).val();
				if ($("#" + "inp" + i).val() == $("#" + "hinp" + i).val()) {
					$("#" + "inp" + i).css("color", "#F00");
					
					//FILL ARRAYS And check completion of each word/group
					groupFilledArray[groupConstantArray[i]]++;
					
					if (groupFilledArray[groupConstantArray[i]] == groupDefinedArray[groupConstantArray[i]]){
					
						$("#input" + groupConstantArray[i]).css("visibility", "hidden");
						$("#img"+ groupConstantArray[i]).css("visibility", "hidden");
						$("#answer"+ groupConstantArray[i]).css("visibility", "visible");
					}	
					
					allObjs++;
					if(allObjs == 30){
					// COMPLETED MAIN ACTIVITY 
						window.parent.activateFor();
					}		
					
				} else {
					$("#" + "inp" + i).css("color", "#000");
				}
			}
			
			
			if (tmpSolution.toUpperCase() == cTl.crosswrd) {
				$("span.crossText").css("visibility", "visible");
				$('input.crosswrd').unbind();
				$("input.crosswrd").attr('disabled', 'disabled');
				//alert("open tool crooswd");
				//setTimeout("openTheTool(3)", 10);
				
				// COMPLETED MAIN ACTIVITY 
				window.parent.activateFor();
	
			}
		}
    }
    else {
		if ($.cookie(cTl.crosswrdCookie) === null) {
			var tmpChecks = $('input.crosswrd').length;
			for (var i = 0; i < tmpChecks; i++) {
				cTl.crosswrdData["inp" + i] = "";
			}
	
			$.cookie(cTl.crosswrdCookie, cTl.crosswrdData, {expires: cTl.cookieLifetime});
		}
		else {
			cTl.crosswrdData = $.cookie(cTl.crosswrdCookie);
			var tmpChecks = $('input.crosswrd').length;
			var tmpSolution = "";
			for (var i = 0; i < tmpChecks; i++) {
				$("#" + "inp" + i).val(cTl.crosswrdData["inp" + i]);
				tmpSolution = tmpSolution + $("#" + "inp" + i).val();
				
				if ($("#" + "inp" + i).val().toUpperCase() == $("#" + "hinp" + i).val().toUpperCase()) {
					$("#" + "inp" + i).css("color", "#F00");
					
					//FILL ARRAYS And check completion of each word/group
					groupFilledArray[groupConstantArray[i]]++;
					
					if (groupFilledArray[groupConstantArray[i]] == groupDefinedArray[groupConstantArray[i]]){
					
						$("#input" + groupConstantArray[i]).css("visibility", "hidden");
						$("#img"+ groupConstantArray[i]).css("visibility", "hidden");
						$("#answer"+ groupConstantArray[i]).css("visibility", "visible");
					}	
					
					allObjs++;
					if(allObjs == 30){
					// COMPLETED MAIN ACTIVITY 
						window.parent.activateFor();
					}	
					
				} else {
					$("#" + "inp" + i).css("color", "#000");
				}
			
			}
			
			//alert("groupFilledArray: "+groupFilledArray+" | groupDefinedArray: "+groupDefinedArray)			
			
			if (tmpSolution.toUpperCase() == cTl.crosswrd) {
				$("span.crossText").css("visibility", "visible");
				$('input.crosswrd').unbind();
				$("input.crosswrd").attr('disabled', 'disabled');
				//alert("open tool crooswd");
				//setTimeout("openTheTool(3)", 10);
				
				
			}
		}
    }
	/*
	var myBrowser = get_browser();
	if (myBrowser == 'Chrome') {
	    localStorage.setObject(cTl.highlightCookie, cTl.highlightData);
	} else {
	    $.cookie(cTl.highlightCookie, cTl.highlightData, {expires: cTl.cookieLifetime});
	}
	*/
    
});