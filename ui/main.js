console.log('Loaded!');
var element = document.getElementById('main-text');

element.innerHtml = 'RAJINIKANTH';




function moveRight(){
    marginLeft = marginLeft+1;
    img.style.marginLeft =marginLeft + 'px';
}
var img = document.getElementById('madi');

img.onclick = function(){
    var interval = setInterval(moveRight, 50);
};