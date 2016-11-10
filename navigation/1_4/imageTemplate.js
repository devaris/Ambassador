function loadImage(myImage){
	//alert ("load Image: "+myImage)
	var	theHTML ='<img src="'+myImage+'" alt="Exercise Image"  id="exImage" />'
	$("#myImage").html(theHTML);
}

$(document).ready(function()    {
	//alert("test me")
	loadImage(exJSON.image)	
})