console.log('Loaded!');

var element = document.getElementById("sam");
element.innerHtml = "kabali Dawwww.......nerupur dawwwww nerungu dawwwww...";


var img = document.getElementById('madi');
var marginLeft =0;

function moveRight(){
    marginLeft = marginLeft+1;
    img.style.marginLeft =marginLeft + 'px';
}


img.onclick = function(){
    var interval = setInterval(moveRight, 50);
};