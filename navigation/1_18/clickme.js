// GLOBALS
var correctAns = [1,0,0,1,0,1,1];
var corrToFind = 0;
var totalCorr = 0;
var totalWrong = 0;

// COOKIES
var cookieJSON;
var myCookieName ='AmbassadorEx1_18';
var cookieLifetime = 365;

// FUNCTIONS
var foodNums = [2,2,2,2,0,2,0,0];
var sportNums = [1,0,0,0,1,2,1];

//var myGender='female';
var myGender = window.parent.myGender;

function checkCompletion(){
	if(totalCorr==corrToFind){		
		//window.parent.activateFor();		
		$(".slide11b img").unbind("click", clickItems);
		$(".slide11b img").css('cursor','default');		
	}// END if totalCorr		
	else{
		$(".slide11b img").css('cursor','pointer');
	}
}

function clickItems(){

	if($('#slide11_T'+($(this).index()+1)).css('opacity') == '0.25'){
		$('#slide11_T'+($(this).index()+1)).css('opacity','1');
		cookieJSON.selections[$(this).index()]=0;
			
		if (correctAns[$(this).index()]==1){
			totalCorr--;
		} else {
			totalWrong--;
		}
	} else {
		// INITIAL CLICK
		$('#slide11_T'+($(this).index()+1)).css('opacity','0.25');
		cookieJSON.selections[$(this).index()]=1;
		
		if (correctAns[$(this).index()]==1){
			$('.slide11b img').removeClass('animated fadeInUp');
			$('#slide11_'+($(this).index()+1)).css('animation-delay','0s');
			$('#slide11_'+($(this).index()+1)).addClass('animated bounce');
			totalCorr++;
			audioCorrect();
			
		} else {
			totalWrong++;
			audioWrong();
		} // END if of Correct
		
	} // END if Option is VISIBLE
	
	
	checkCompletion();
	
	// SAVE CHANGES IN COOKIE
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieName,null);
		localStorage.setObject(myCookieName,cookieJSON)
	}
	else{
		$.removeCookie(myCookieName)
		$.cookie(myCookieName, cookieJSON, cookieLifetime);
	}	
	
} // END function clickItems 

function clearCookie(){
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieName,{'selections':[]});
	}
	else{
		if ($.cookie(myCookieName)===null){		
		}
		else{
			cookieJSON = $.cookie(myCookieName)
		}
		$.removeCookie(myCookieName);
	}	
}
function showFinalImg(myFinImg){
	$(document.getElementById("slide11_T1")).css('opacity','0.35');
	$(document.getElementById("slide11_T2")).css('opacity','0.35');
	$(document.getElementById("slide11_T3")).css('opacity','0.35');
	if (myFinImg<2){
		$(document.getElementById("slide11_T1")).css('opacity','1');
	}else if ((myFinImg>1)&&(myFinImg<4)){
		$(document.getElementById("slide11_T2")).css('opacity','1');
	}
	else{
		$(document.getElementById("slide11_T3")).css('opacity','1');
	}
	
}
		
$(document).ready(function() {	
	var myItemNum = '';
	var mySecItemNum = '';
	var totalNums='';
	
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
			if (localStorage.getItem(myCookieName)===null){	
				localStorage.setObject(myCookieName,{'selections':[]})
				cookieJSON = localStorage.getObject(myCookieName)
			}
			else{
				cookieJSON = localStorage.getObject(myCookieName)
			}
		}
		else{
			$.cookie.json = true;
			if ($.cookie(myCookieName)===null){		
				$.cookie(myCookieName, {'selections':[]}, cookieLifetime);
				cookieJSON = $.cookie(myCookieName)
			}
			else{
				cookieJSON = $.cookie(myCookieName)
			}
		}

		var allItems = document.getElementsByClassName("myItem");
		var allSecItems = document.getElementsByClassName("mySecItem");		
		var allImgF = document.getElementsByClassName("myImgFinal");

		 for (m = 0; m < allImgF.length; m++) {
			if (myGender=="male"){
				allImgF[m].src="images/man"+(m+1)+".png";
			}
			$(allImgF[m]).css('opacity','0.35');
		}
	
        for (i = 0; i < allItems.length; i++) {
			$(allItems[i]).css('opacity','1');
			$(allItems[i]).css('cursor','pointer');

            allItems[i].addEventListener("click",
                function () {					
					for (k = 0; k < allItems.length; k++) {						
						$(allItems[k]).css('opacity','0.35');
					}	
					this.style.opacity=1;
					myItemNum = foodNums[(this.id.substr(8))-1];		
					if (mySecItemNum !== ""){
						totalNums=myItemNum+mySecItemNum;
						showFinalImg(totalNums);
						console.log('myItemNum:  '+myItemNum+'  mySecItemNum: '+mySecItemNum+'  totalNums: '+totalNums);
					}				
				});
        }

        for (i = 0; i < allSecItems.length; i++) {
			$(allSecItems[i]).css('opacity','1');
			$(allSecItems[i]).css('cursor','pointer');

            allSecItems[i].addEventListener("click",
                function () {					
					for (k = 0; k < allSecItems.length; k++) {						
						$(allSecItems[k]).css('opacity','0.35');
					}	
					this.style.opacity=1;
					mySecItemNum = sportNums[(this.id.substr(9))-1];
					if (myItemNum !== ""){					
						totalNums=myItemNum+mySecItemNum;
						showFinalImg(totalNums);
						console.log('myItemNum:  '+myItemNum+'  mySecItemNum: '+mySecItemNum+'  totalNums: '+totalNums);
					}
									
				});
        }

	// INIT ACTIVITY
	jQuery.each(correctAns, function(index, value) {
		//if(correctAns[index]==1){
		if(value==1){
			corrToFind++;
		}
		
		// INIT COOKIES
		if(cookieJSON.selections[index]===1){
			$('#slide11_T'+(index+1)).css('visibility','visible');
			if (correctAns[index]==1){
				totalCorr++;
			} else {
				totalWrong++;
			} // END if of Correct
		}		
		// return (this != "three"); //will stop running after "three"
		return corrToFind;
	});

	// Add Interactivity
	//$(".slide11b img").click(clickItems);
	//$(".slide11b img, .secondBox img").click(clickItems);	
	//checkCompletion();	
	
}); // End of $(document).ready