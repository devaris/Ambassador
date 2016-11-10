// JavaScript Document
var currTar = "";
var objPositions = {};
var dndCookie = 'AmbassadorEx1_4';
var cookieLifetime = 365;
var thenext = 1;
var allObg = 0;
var corrArray = [1];
var ua = navigator.userAgent;
var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);


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

$(document).ready(function() {	

    $("span.drop").html("");
	
	$("#large1").hide();
	$("#large2").hide();
	$("#large3").hide();
	$("#large4").hide();
	$("#large5").hide();
	$("#large6").hide();

	$("#x").css("visibility", "hidden");
	
    //then ready cookies
    $.cookie.json = true;

    $(".drags  span").draggable({
	revert: "invalid",
	start: function(event, ui) {
	    currTar = $(this);
	    //$(this).removeClass("scaleDown");
	},
	/*		stop : function (event, ui) {
	 currTar = $(this);
	 $(this).removeClass("scaleDown");
	 }*/
    });

	//$('.drags').addClass('animated bounceInUp');
	//$('#jd').addClass('animated pulse');
    
	$(".drop").droppable({
	tolerance: 'touch',
	drop: function(event, ui) {
	    var theDraggedId = Number($(currTar).attr("id").replace("drag", ""));
	    var theTargetId = Number($(this).attr("id").replace("drop", ""));

	    //if it latches anyway
		if (corrArray[theDraggedId-1] == theTargetId) {

			audioCorrect();
			allObg++
			//thenext++;
			$("#large"+theTargetId).show();
		/*	PrefixedEvent(document.getElementById("imginfo"), "AnimationEnd", function() {
				//alert("end");
				$("#large" + theDraggedId).hide();
				//$("#drag" + theDraggedId).css("visibility", "hidden");
				$("#drop1").html("");
				if (thenext <= totalQs){
					document.getElementById("imginfo").src = "b" + thenext + "p.png";	
					document.getElementById("imginfo").className = "";
					//document.getElementsById("imginfo").
					//window.setTimeout(function (){$("#anim").remove();}, 9500);
				}
			}, false);
			$("#imginfo").addClass("animated fadeOutRight");
		*/
			currTar.offset({top: ($(this).offset().top - 3), left: ($(this).offset().left - 0)});
			currTar.draggable('disable');
			//currTar.css("visibility", "hidden");
			//$(this).html(currTar.html());
			$(this).html("");
			objPositions[currTar.attr("id")] = thenext;
			$("#drag" + theDraggedId).css("visibility", "hidden");
			var myBrowser = get_browser();
			if ((myBrowser=='Chrome')||(isiPad==true)) {
				//localStorage.setObject(dndCookie,null);
				localStorage.setObject(dndCookie, objPositions);
			} else {
				$.cookie(dndCookie, objPositions, {expires: cookieLifetime});
			}
			
			if(allObg === 1){
				audioPlay("completed");
				//window.parent.unlockNextLevel();
				
				// COMPLETED MAIN ACTIVITY 
				window.parent.activateFor();
			}
	    } 
		else {
			audioWrong();

			//$(this.parentNode).html('<img id="x" src="X.png" style="position:relative; top:20px; z-index:1000;">');
			/*
			$("#qmark"+theTargetId).css("visibility", "hidden");
			$("#x").css("visibility", "visible");
			$("#x").offset({top: ($("#qmark"+theTargetId).offset().top), left: ($("#qmark"+theTargetId).offset().left)});
			window.setTimeout(function (){$("#qmark"+theTargetId).css("visibility", "visible");$("#x").css("visibility", "hidden");}, 500);
			*/
			//display the exclamation mark!!
	
			currTar.animate({left: 0, top: 0}, 200, "linear");
	    }
	    //			$("#"+"drag"+theDraggedId).addClass("scaleDown");

	    /*			if (settings.dragItems["dragItem"+theDraggedId].places.indexOf(theTargetId) >= 0 ) {
	     //play correct
	     } else {
	     //alert("wrong, revert");
	     }*/

	}
    });

    $(".drags  span").each(function(index, element) {
	objPositions[$(this).attr("id")] = $(this).offset();
    });
	
	
	// RESET
	var doIreset=false;
	try {
		doIreset=window.parent.resetEx();
	}
	catch(e){
	}
	
	if (doIreset==true)
		clearCookie();

    var myBrowser = get_browser();
    if ((myBrowser=='Chrome')||(isiPad==true)) {
	if (localStorage.getItem(dndCookie) === null) {
	    localStorage.setObject(dndCookie, objPositions);
	    //cookieJSON = localStorage.getObject(dndCookie)
	} else {
	    objPositions = localStorage.getObject(dndCookie);
	    $(".drags span").each(function(index, element) {
		if (typeof objPositions[$(this).attr("id")] == "object") {
		    //$(this).offset(objPositions[$(this).attr("id")]);
		} else {
		    thenext++;
		    $(this).css("visibility", "hidden");
			$(this.parentNode).css("cursor", "auto");
			currDrag = Number($(this).attr("id").replace("drag", ""));
			currDrag = corrArray[currDrag-1];
			allObg++
			$("#large"+currDrag).show();
			//$("#drop"+currDrag).hide();
			
		    //$("#drop" + $(this).attr("id").replace("drag", "")).html(objPositions[$(this).attr("id")]);
		    $(this).draggable('disable');
		    //				alert ("do something in the html");
		}
	    });
	}
    } else {
	
	//cookie for dnd
	if ($.cookie(dndCookie) == null) {
	    $.cookie(dndCookie, objPositions, {expires: cookieLifetime});
	} else {
	    objPositions = $.cookie(dndCookie);
	    $(".drags span").each(function(index, element) {
		if (typeof objPositions[$(this).attr("id")] == "object") {
		    //$(this).offset(objPositions[$(this).attr("id")]);
		} else {
		    thenext++;
		    $(this).css("visibility", "hidden");
			$(this.parentNode).css("cursor", "auto");
			currDrag = Number($(this).attr("id").replace("drag", ""));
			currDrag = corrArray[currDrag-1];
			allObg++
			$("#large"+currDrag).show();
			//$("#drop"+currDrag).hide();
			
		    //$("#drop" + $(this).attr("id").replace("drag", "")).html(objPositions[$(this).attr("id")]);
		    $(this).draggable('disable');
		    //				alert ("do something in the html");
			if (thenext==2){
				
			}
			if(allObg === 1){
				// COMPLETED MAIN ACTIVITY 
				window.parent.activateFor();
			}
			
		}
	    });
	}
    }

	//document.getElementById("imginfo").src = "b" + thenext + "p.png";
    //document.getElementsByClassName("mainText")[0].children[0].textContent = settings.textInHTML;

    var theDrops = "";
    var theDrags = "";
    //$('.drags').addClass('');
    //$('.drags').addClass('animated bounceInLeft');

    /*
     document.getElementsByClassName("drags")[0].addEventListener("animationend", function() {
     //peta th perdika!
     $("body").append('<img id="anim" style="z-index:1; position:absolute; top:65%; left: 0px;" src="grousie1024.gif">');
     window.setTimeout(function (){$("#anim").remove();}, 9500);
     //alert("end");
     }, false);
     */
    //$('.drags').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doSomething());
});