console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerhtml = "RAJINIKANTH";


var img = document.getElementById('mandy');

function rightmove(){
    marginLeft = marginLeft+1;
    img.style.marginLeft =marginLeft + 'px';
}

img.onclick = function(){
    var interval = setInterval(rightmove, 50);
};
