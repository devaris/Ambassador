var xmlDoc;
var xmlloaded = false;
var ua = navigator.userAgent;
var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
var score;
var myHighlight;
var mySignature = "multiple";
var cookieJSON;
var myCookieName = 'AmbassadorEx3_2';
var cookieLifetime = 365;
var cookieSavedNo = 0;
var currQuestion = 0
var totalQuestions;

function animateClicks() {
    var x = $(".TrueFalse");
    for (var i = 0; i < x.length; i++) {
        var y = $(x[i].getElementsByTagName("input"));
        for (var j = 0; j < y.length; j++) {
            $(y[j].nextElementSibling).addClass('animated fadeInLeft');
        }
    }
}

function hideAnswers() {
    var x = $("input")
    for (i = 0; i < x.length; i++) {

        $(x[i].nextElementSibling).removeClass("checkCorr");
        $(x[i].nextElementSibling).removeClass("checkWron");
    }
    var z = $("span")
    for (var j = 0; j < z.length; j++) {

        var o = $(z[j].getElementsByTagName("img"))
        /*
         $(o[1]).removeClass("showMe");
         $(o[1]).addClass("hideMe");
         $(o[2]).removeClass("showMe");
         $(o[2]).addClass("hideMe");
         */
    }
}

function checkAnswersImg(myImg) {

    var myInput = $(myImg.parentNode.parentNode.getElementsByTagName("input"))[0]
    myInput.click()
    //checkAnswers()
}

function checkAnswers(myItem) {
    var qScore;
    score = 0;
    hideAnswers()
    var mistakes
    var x = $(".TrueFalse")
    //alert("cookiJSON = "+JSON.stringify(cookieJSON))
    for (var i = 0; i < x.length; i++) {
        var myCorrects = 0;
        qScore = 0;
        mistakes = 0;
        var y = $(x[i].getElementsByTagName("input"))
        var z = $(x[i].getElementsByTagName("span"))
        for (var j = 0; j < y.length; j++) {

            if ($(x[i]).attr("corrects") > 1) {
                cookieJSON.selections[i][j] = false
            }
            if ($(y[j]).attr("checked")) {
                if ($(x[i]).attr("corrects") > 1) {
                    cookieJSON.selections[i][j] = true
                }
                else {
                    cookieJSON.selections[i] = j
                }
                if ($(y[j]).attr("isCorrect")) {
                    $(y[j].nextElementSibling).addClass("checkCorr");
                    var o = $(z[j].getElementsByTagName("img"))
                    /*$(o[1]).removeClass("hideMe");*/
                    $(o[1]).addClass("showMe");
                    qScore++
                    myCorrects++;
                    if (y[j] == myItem) {
                        if (j == 0) {
                            $(o[0]).addClass("animated bounce");
                            $(o[1]).addClass("animated bounce");
                        } else {
                            $(o[0]).addClass("animated bounce");
                            $(o[1]).addClass("animated bounce");
                        }
                        audioCorrect();
                    }
                }
                else {
                    //$(y[j].nextElementSibling).addClass("checkWron");
                    //$(y[j].nextElementSibling).addClass('animated fadeOut');
                    /*var o=$(z[j].getElementsByTagName("img"))
                     $(o[2]).removeClass("hideMe");
                     $(o[2]).addClass("showMe");*/
                    if ($(x[i]).attr("any_answer")) {
                        mistakes++
                    }
                    else
                    {
                        qScore--
                    }
                    if (y[j] == myItem) {
                        audioWrong();
                    }
                }
            }
            else {
            }
        }
        if ($(x[i]).attr("corrects") == myCorrects) {
            for (var j = 0; j < y.length; j++) {
                if (!$(y[j]).attr("checked")) {
                    $(y[j].nextElementSibling).addClass("checkWron");
                    /*$(y[j].nextElementSibling).addClass('animated fadeOut');*/
                }
            }
        }
        if (qScore / $(x[i]).attr("corrects") < 1) {
            if ($(x[i]).attr("any_answer")) {
                if (mistakes > 0) {
                    qScore = 0
                }
            }
            else {
                qScore = 0
            }
        }
        else {
            qScore = 1
            if ($(x[i]).attr("any_answer")) {
                if (mistakes > 0) {
                    qScore = 0
                }
            }
        }
        score = score + qScore
    }
    $("#myScore").val(score)
	
	// *** ACTIVITY IS COMPLETED!
	if (score == 5){
		// COMPLETED MAIN ACTIVITY 
		try {
			window.parent.activateFor();
		} catch(err) {
		}
		
		
	}


    var myBrowser = get_browser();
    if ((myBrowser=='Chrome')||(isiPad==true)) {
        localStorage.setObject(myCookieName, null);
        localStorage.setObject(myCookieName, cookieJSON);
    }
    else {
        $.removeCookie(myCookieName)
        $.cookie(myCookieName, cookieJSON, {expires: cookieLifetime});
    }
    if ($(x[i]).attr("any_answer")) {
        if (mistakes > 0) {
            qScore = 0
        }
    }

    var y = exJSON.exercise.items;
    //$("#myScorePerc").val(Math.round((score/y.length)*100) + '%')
    //alert (Math.round((score/y.length)*100) + '%')
    //updateMain(this);
    if (Math.round((score / y.length) * 100) == 100) {
        //alert("disable all")
        /*$("input").attr('disabled', true);*/
        $("ul li").attr('style', 'cursor:default')

        //audioCorrect();
    } else {
        //audioWrong();
    }
}


function showAnswers() {
    var x = $("input")
    for (i = 0; i < x.length; i++) {
        if ($(x[i]).attr("iscorrect")) {
            $(x[i].nextElementSibling).addClass("showCorr");
        }
    }
}

/******* JSON ***************/

function readJSON() {
    var theJSONElements = "";
    var countCorrect;
    var itemType;
    var exItems = exJSON.exercise.items
    var selectedAttr;
    var myClass;
    var mImageSel;
    var markCorrClass;
    var markWronClass;
    var showClassQuestion;
    //alert(x.length);
    for (i = 0; i < exItems.length; i++)
    {
        countCorrect = 0;
        if (currQuestion == i) {
            showClassQuestion = "showMe"
        } else {
            showClassQuestion = "hideMe"
        }
        theJSONElements += '<div id="tf' + (i + 1) + '" class="TrueFalse ' + showClassQuestion + '"'
        var w = exItems[i].stem;
        var y = exItems[i].answers
        var o = exItems[i].correct
        countCorrect = o.length
        theJSONElements += ' corrects=' + countCorrect
        if (exItems[i].any_answer) {
            theJSONElements += ' any_answer="true"'
        }
        theJSONElements += '> <div class="stem">' + w + '</div>'
        theJSONElements += '<img class="animated fadeIn" id="img' + (i + 1) + '" alt="Image" src="img' + (i + 1) + '.png" width="567" height="331">' + '<ul>'
        if ((countCorrect > 1) || (exItems[i].checkbox)) {
            itemType = "checkbox";
        }
        else {
            itemType = "radio";
        }
        if (cookieJSON.selections[i] == undefined) {
            if (countCorrect > 1) {
                cookieJSON.selections[i] = []
                for (j = 0; j < y.length; j++) {
                    cookieJSON.selections[i].push("false")
                }
            }
            else {
                cookieJSON.selections[i] = -1
            }
            selectedAttr = cookieJSON.selections[i]
        }
        else {
            selectedAttr = cookieJSON.selections[i]
        }
        for (j = 0; j < y.length; j++)
        {
            myClass = ' class="checkWron"'
            markCorrClass = "hideMe"
            //	markWronClass = "showMe"
            if ((exJSON.exercise.checkButton) && (exJSON.exercise.checkButton == "true")) {
                theJSONElements += '<li>' + '<input name="mul' + i + '" type="' + itemType + '"' + ' onclick=hideAnswers()'
            }
            else {
                theJSONElements += '<li>' + '<input name="mul' + i + '" type="' + itemType + '"' + ' onclick=checkAnswers(this)'
            }
            for (var k = 0; k < countCorrect; k++) {
                if (o[k] == j) {
                    theJSONElements += ' isCorrect=true'
                    myClass = ' class="checkCorr"'
                    //markCorrClass = "showMe"
                    //markWronClass = "hideMe" 
                }
            }
            if (countCorrect > 1) {
                if (selectedAttr[j] == true) {
                    cookieSavedNo++;
                    theJSONElements += ' checked'
                }
                else {
                    myClass = ''
                    markCorrClass = "hideMe"
                    //markWronClass = "hideMe" 
                }
            }
            else {
                if (j == selectedAttr) {
                    cookieSavedNo++;
                    theJSONElements += ' checked'
                }
                else {
                    myClass = ''
                    markCorrClass = "hideMe"
                    //markWronClass = "hideMe" 
                }
            }
            //theJSONElements += ' />'+'<span'+myClass+'>'+ y[j]+'<img class="imageChoicePos" src="'+y[j]+'" alt="'+y[j]+'"><img class="mymark '+markCorrClass+'" src="../../images/corr.png" width="30" height="30"><img class="mymark '+markWronClass+'" src="../../images/wron.png" width="30" height="30"></span>'+'</li>'

            markWronClass = "hideMe"

            if (j == 0) {
                mImageSel = "yes2.png"
            }
            if (j == 1) {
                mImageSel = "no2.png"
            }
            theJSONElements += ' class="hideMe"/>' + '<span' + myClass + '>' + '' + '<img class="imageChoicePos" src="' + y[j] + '" alt="' + y[j] + '" onclick=checkAnswersImg(this) width="97" height="77"><img class="mymark' + j + ' ' + markWronClass + '" src=' + mImageSel + ' width="97" height="77"></span>' + '</li>'
        }
        theJSONElements += '</ul>' + '</div>'

    }
    theJSONElements += '<img id="imageBackPos" class="hideMe" src="leftArrow.png" alt="Previous" onclick=goBack() width="71" height="83">'
    theJSONElements += '<img id="imageNextPos" src="rightArrow.png" alt="Next" onclick=goNext() width="71" height="83">'
    /*
     var z=exJSON.exercise.rubric
     theJSONElements += '<div class="sidebarCont2">' + z + '</div>'
     */
    return theJSONElements;
}

function call1() {
    var x = exJSON.exercise.myText
    document.getElementById("readTextarea").innerHTML = x;
    return true;
}

function callorig(kati) {
    var x = $(".highlight")
    for (var i = 0; i < x.length; i++)
    {
        if ($(x[i]).attr("id") == "hl" + myHighlight) {
            $(x[i]).addClass("under")
        }
    }
    if ($("#readTextarea .scrollOnce").length != 0) {
        $('#readTextarea').animate({scrollTop: $("#readTextarea .scrollOnce").offset().top - 100}, 0);
    }
//	$('#readTextarea').animate({scrollTop: $("#scrollAnchor").offset().top}, 0);
}

function makePageChanges(theContent) {
    myHighlight = 0;
    $("#truefalses").html(theContent);
    var x = $(".TrueFalse");
    //alert("cookiJSON = "+JSON.stringify(cookieJSON))
    for (var i = 0; i < x.length; i++) {
        var y = $(x[i].getElementsByTagName("input"));
        var z = $(x[i].getElementsByTagName("span"));
        var myCorrects = 0;
        for (var j = 0; j < y.length; j++) {
            if ($(y[j]).attr("checked") && $(y[j]).attr("isCorrect")) {
                myCorrects++;
            }
        }
        if ($(x[i]).attr("corrects") == myCorrects) {
            for (var j = 0; j < y.length; j++) {
                if (!$(y[j]).attr("checked")) {
                } else {

                    $(y[j]).attr('disabled', true);
                    /*$(y[j].nextElementSibling).addClass('animated fadeOut');*/
                    var o = $(y[j].nextElementSibling.getElementsByTagName("img"))
                    $(o[1]).removeClass('hideMe');
                    $(o[1]).addClass('showMe');
                }
            }
        }
        if (cookieSavedNo > 0) {
        }
    }
    //callorig(call1());
}

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}
function get_browser(){
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    return M[0];
    }
function get_browser_version(){
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    return M[1];
}

// CLEAR COOKIES
function clearCookie(){
	alert("clearCookie")
	//var myCookieName = dndCookie;
	var myBrowser = get_browser();
	
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieName,{'selections':[]});
	}
	else{
		/*
		if ($.cookie(myCookieName)===null){		
		}
		else{
			cookieJSON = $.cookie(myCookieName)
		}
		*/
		$.removeCookie(myCookieName);
	}	
}
// CLEAR COOKIES


function removeAllNavAnime(){
	$('#imageBackPos').removeClass('animated pulse');
	$('#imageNextPos').removeClass("animated pulse");
	
	document.querySelector("#imageBackPos").offsetWidth = document.querySelector("#imageBackPos").offsetWidth;
	document.querySelector("#imageNextPos").offsetWidth = document.querySelector("#imageNextPos").offsetWidth;
	
	$("#imageBackPos").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", removeAllNavAnime);
	$("#imageNextPos").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", removeAllNavAnime);
}

function goBack() {
    var x = $(".TrueFalse")
	
    if (currQuestion > 0) {
        $(x[currQuestion]).addClass("hideMe");
        $(x[currQuestion]).removeClass("showMe");
        currQuestion--
        $(x[currQuestion]).addClass("showMe");
    }
	
	$('#imageBackPos').addClass("showMe");
	$('#imageNextPos').addClass("showMe");
	
	if (currQuestion < 1) {
		$('#imageBackPos').removeClass("showMe");
		$('#imageBackPos').addClass("hideMe");
	}
	
	$('#imageBackPos').addClass("animated pulse");
	$("#imageBackPos").bind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", removeAllNavAnime);
}

function goNext() {
	
    var x = $(".TrueFalse");
	
	
    if (currQuestion < (x.length - 1)) {
        $(x[currQuestion]).addClass("hideMe");
        $(x[currQuestion]).removeClass("showMe");
        currQuestion++
        $(x[currQuestion]).addClass("showMe");
    }
	
	$('#imageBackPos').addClass("showMe");
	$('#imageNextPos').addClass("showMe");
	
	
	if (currQuestion >= (x.length - 1)) {
		$('#imageNextPos').removeClass("showMe");
		$('#imageNextPos').addClass("hideMe");
	}

	$('#imageNextPos').addClass("animated pulse");
	$("#imageNextPos").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", removeAllNavAnime);

}

$(document).ready(function() {
				   
	// CLEAR COOKIES
	var doIreset=false;
	try {
		doIreset=window.parent.resetEx();
	}
	catch(e){
	}
	
	if (doIreset==true){
		clearCookie();
	}
	// CLEAR COOKIES
	
   var myBrowser = get_browser();
   if ((myBrowser=='Chrome')||(isiPad==true)) {
        if (localStorage.getItem(myCookieName) === null) {
            localStorage.setObject(myCookieName, {'selections': []})
            cookieJSON = localStorage.getObject(myCookieName)
        }
        else {
            cookieJSON = localStorage.getObject(myCookieName)
        }
    }
    else {
        //$.removeCookie(myCookieName)
        $.cookie.json = true;
        if ($.cookie(myCookieName) === null) {
            $.cookie(myCookieName, {'selections': []}, {expires: cookieLifetime});
            cookieJSON = $.cookie(myCookieName)
        }
        else {
            cookieJSON = $.cookie(myCookieName)
        }
    }

    makePageChanges(readJSON());
	
	checkAnswers();
	
    $("#showAnswers").click(function() {
        showAnswers()
    });
    $("#checkAnswers").click(function() {
        checkAnswers()
    });
    if ((exJSON.exercise.checkButton) && (exJSON.exercise.checkButton == "true")) {
    }
    else {
        document.getElementById("showAnswers").style.display = "none";
        document.getElementById("checkAnswers").style.display = "none";
    }
});