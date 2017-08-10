console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerhtml = "RAJINIKANTH";




function rightmove(){
    marginLeft = marginLeft+1;
    img.style.marginLeft =marginLeft + 'px';
}
var img = document.getElementById('mandy');

img.onclick = function() {
    var interval = setInterval(rightmove, 50);
};
