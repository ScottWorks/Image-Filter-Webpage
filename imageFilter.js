var origImg = null;
var greyImg;
var redImg;
var rainImg;
var pickImg;

var canOriginal;
var canFiltered;


 
function loadImg(){ // Loads background image into canvas 1
	var fileInput = document.getElementById("fileIn");
    origImg = new SimpleImage(fileInput);
    greyImg = new SimpleImage(fileInput);
    redImg = new SimpleImage(fileInput);
    rainImg = new SimpleImage(fileInput);
    pickImg = new SimpleImage(fileInput);
    canOriginal = document.getElementById("canOriginal");
    canFiltered = document.getElementById("canFiltered");
    origImg.drawTo(canOriginal);  
    clearFilteredCanvas();
}


function isImgLoad(object){
    if (object == null || !object){ // checks to see that file is loaded
		alert("The Background Image is not loaded, please try again.");
    }
    else {
        return true
    }
}


function greyScale(){
    isImgLoad(origImg);

	for (var pixel of greyImg.values()) {
		var red = pixel.getRed();
		var blue = pixel.getBlue();
		var green = pixel.getGreen();

		var avg = (red+blue+green)/3; 

		pixel.setRed(avg);
		pixel.setBlue(avg);
		pixel.setGreen(avg);
	}
	greyImg.drawTo(canFiltered);
}


function redScale(){
    isImgLoad(origImg);

    for (var pixel of redImg.values()){
        var red = pixel.getRed();
		var blue = pixel.getBlue();
        var green = pixel.getGreen();
        
        var avg = (red+blue+green)/3; 

        if (avg < 128) {
            pixel.setRed(avg*2);
            pixel.setGreen(0);
            pixel.setBlue(0); 
        }
        else {
            pixel.setRed(255);
            pixel.setGreen((avg*2)-255);
            pixel.setBlue((avg*2)-255);   
        }

    }
    redImg.drawTo(canFiltered);
}


function rainbowScale(){
    isImgLoad(origImg);

    var wid = rainImg.getWidth();
    var hgt = rainImg.getHeight();

    var div = (hgt/7);
    var redSec = div; 
    var orgSec = 2*div; 
    var yelSec = 3*div;
    var grnSec = 4*div;
    var bluSec = 5*div;
    var indSec = 6*div;
    var vioSec = 7*div;

    for (var pixel of rainImg.values()){
        var x = pixel.getX();
        var y = pixel.getY();
        
        var red = pixel.getRed();
		var blue = pixel.getBlue();
        var green = pixel.getGreen();

        var avg = (red+blue+green)/3; 
        
        if (y < redSec && avg < 128){
            pixel.setRed(avg*2);
            pixel.setGreen(0);
            pixel.setBlue(0); 
        }

        else if (y < redSec && avg >= 128) {
            pixel.setRed(255);
            pixel.setGreen((avg*2)-255);
            pixel.setBlue((avg*2)-255);  
        }
        
        if (y >= redSec && y < orgSec && avg < 128){
            pixel.setRed(avg*2);
            pixel.setGreen(avg*0.8);
            pixel.setBlue(0); 
        }

        else if (y >= redSec && y < orgSec && avg >= 128) {
            pixel.setRed(255);
            pixel.setGreen((avg*1.2)-51);
            pixel.setBlue((avg*2)-255);  
        }
            
        if (y >= orgSec && y < yelSec && avg < 128){
            pixel.setRed(avg*2);
            pixel.setGreen(avg*2);
            pixel.setBlue(0); 
        }

        else if (y >= orgSec && y < yelSec && avg >= 128) {
            pixel.setRed(255);
            pixel.setGreen(255);
            pixel.setBlue((avg*2)-255);  
        }
          
        if (y >= yelSec && y < grnSec && avg < 128){
            pixel.setRed(0);
            pixel.setGreen(avg*2);
            pixel.setBlue(0); 
        }

        else if (y >= yelSec && y < grnSec && avg >= 128) {
            pixel.setRed((avg*2)-255);
            pixel.setGreen(255);
            pixel.setBlue((avg*2)-255);  
        }

        if (y >= grnSec && y < bluSec && avg < 128){
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(avg*2); 
        }

        else if (y >= grnSec && y < bluSec && avg >= 128) {
            pixel.setRed((avg*2)-255);
            pixel.setGreen((avg*2)-255);
            pixel.setBlue(255);  
        }
        
        if (y >= bluSec && y < indSec && avg < 128){
            pixel.setRed(0.8*avg);
            pixel.setGreen(0);
            pixel.setBlue(avg*2); 
        }

        else if (y >= bluSec && y < indSec && avg >= 128) {
            pixel.setRed((avg*1.2)-51);
            pixel.setGreen((avg*2)-255);
            pixel.setBlue(255);  
        }        
        
        if (y > indSec && avg < 128){
            pixel.setRed(1.6*avg);
            pixel.setGreen(0);
            pixel.setBlue(1.6*avg); 
        }

        else if (y > indSec && avg >= 128) {
            pixel.setRed((avg*0.4)+153);
            pixel.setGreen((avg*2)-255);
            pixel.setBlue((avg*0.4)+153);  
        }
    }
                rainImg.drawTo(canFiltered);

}


function redSldr(){
    var inputValRed = document.getElementById("redSlide");
    var valRed = inputValRed.value;
    return valRed;
}


function greenSldr(){
    var inputValGreen = document.getElementById("greenSlide");
    var valGreen = inputValGreen.value;
    return valGreen;
}


function blueSldr(){
    var inputValBlue = document.getElementById("blueSlide");
    var valBlue = inputValBlue.value;
    return valBlue;
}


function colorPicker(){
    for (var pixel of pickImg.values()){
        var red = pixel.getRed();
		var blue = pixel.getBlue();
        var green = pixel.getGreen();
        
        var avg = (red+blue+green)/3; 

        var redVal = redSldr();
        var greenVal = greenSldr();
        var blueVal = blueSldr();

        if (avg < 128) {
            pixel.setRed((redVal/127.5)*avg);
            pixel.setGreen((greenVal/127.5)*avg);
            pixel.setBlue((blueVal/127.5)*avg); 
        }
        else {
            pixel.setRed((2-redVal/127.5)*avg+2*redVal-255);
            pixel.setGreen((2-greenVal/127.5)*avg+2*greenVal-255);
            pixel.setBlue((2-blueVal/127.5)*avg+2*blueVal-255);   
        }
    }
    pickImg.drawTo(canFiltered);
}


function resetImage(){ // resets filtered image
    origImg.drawTo(canFiltered);  
}


function clearOriginalCanvas(){ // Clears canvas by generating a whitebox over canvas 1 and 2  

        empty = new SimpleImage(origImg.getWidth(), origImg.getHeight());

		for (var pixel of empty.values()){
		pixel.setRed(255);
		pixel.setBlue(255);
		pixel.setGreen(255);
    }
    empty.drawTo(canOriginal);
}


function clearFilteredCanvas(){ // Clears canvas by generating a whitebox over canvas 1 and 2  

        empty = new SimpleImage(origImg.getWidth(), origImg.getHeight());

		for (var pixel of empty.values()){
		pixel.setRed(255);
		pixel.setBlue(255);
		pixel.setGreen(255);
    }
    empty.drawTo(canFiltered);
}


function clearCanvas(){ // Clears canvas by generating a whitebox over canvas 1 and 2  
    clearOriginalCanvas();
    clearFilteredCanvas();
}





//TODO get clearCanvas function to work! 
//TODO add blurImage() function 
