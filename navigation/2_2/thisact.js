// JavaScript Document
var currTar = "";
var thenext = 1;
var allObjs = 0;
var totalQs = 4;

var cTl = {};
cTl.crosswrdCookie = 'AmbassadorEx2_2';

cTl.cookieLifetime = 365;
cTl.elements = [];
//cTl.crosswrd = '5,3,2';
cTl.crosswrd = '532';
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
	
		
		
		//check if pressed char is Backspace, tab or delete
		if (event.which == 8 || event.which == 0) { 
			//event.preventDefault();
			$(this).val("");
			cTl.crosswrdData[$(this).attr("id")] = $(this).val();
			$(this).css("color", "#000");
			var tmpId = Number($(this).attr("id").replace("inp", ""));
			tmpId--;
			try {
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
				
				$("#inp" + tmpId).css("visibility", "hidden");
				$("#img" + tmpId).css("visibility", "hidden");
				$("#false" + tmpId).css("visibility", "hidden");
				$("#true" + tmpId).css("visibility", "visible");
				$("#answer"+ tmpId).css("visibility", "visible");
				
				//$(this).css("color", "#090");

				audioCorrect();
				
				allObjs++;
				if(allObjs == 3){
					// COMPLETED MAIN ACTIVITY 
					window.parent.activateFor();
				}			
			} 
			else {
				
				$("#false" + tmpId).css("visibility", "visible");
				
				$(this).css("color", "#F00");
				audioWrong();
			}
			cTl.crosswrdData[$(this).attr("id")] = $(this).val();
			tmpId++;
			try {
				$("#" + "inp" + tmpId).focus();
			} catch (err) {
			//focus nowhere!
			}
		}
		
	});
	// End keypress


    $('input.crosswrd').keyup(function(event) {
	

		if (event.which == 8) {
			//event.preventDefault();
		}
		else {
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
		var myBrowser = get_browser();
		if (myBrowser == 'Chrome') {
			localStorage.setObject(cTl.crosswrdCookie, cTl.crosswrdData);
		} else {
			$.cookie(cTl.crosswrdCookie, cTl.crosswrdData, {expires: cTl.cookieLifetime});
		}
	});
	// End KeyUp



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
					$("#" + "inp" + i).css("color", "#090");
					
					//alert("correct");
					$("#inp" + i).css("visibility", "hidden");
					$("#img" + i).css("visibility", "hidden");
					$("#false" + i).css("visibility", "hidden");
					
					$("#true" + i).css("visibility", "visible");
					$("#answer"+ i).css("visibility", "visible");
					
					allObjs++;
				} else {
					$("#" + "inp" + i).css("color", "#F00");
				}
			}
			
			if (tmpSolution.toUpperCase() == cTl.crosswrd) {
				$("span.crossText").css("visibility", "visible");
				$('input.crosswrd').unbind();
				$("input.crosswrd").attr('disabled', 'disabled');
				
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
					$("#" + "inp" + i).css("color", "#090");
					
					//alert("correct");
					$("#inp" + i).css("visibility", "hidden");
					$("#img" + i).css("visibility", "hidden");
					$("#false" + i).css("visibility", "hidden");
					
					$("#true" + i).css("visibility", "visible");
					$("#answer"+ i).css("visibility", "visible");
					
					allObjs++;
					
				} else {
					//alert("wrong");					
					$("#" + "inp" + i).css("color", "#F00");
				}
			}
			
			if (tmpSolution.toUpperCase() == cTl.crosswrd) {
				$("span.crossText").css("visibility", "visible");
				$('input.crosswrd').unbind();
				$("input.crosswrd").attr('disabled', 'disabled');
				
				//setTimeout("openTheTool(3)", 10);
				
				// COMPLETED MAIN ACTIVITY 
				window.parent.activateFor();
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