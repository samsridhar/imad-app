//counter code


var counter = 0;

window.onload = function(){
    document.getElementById('counter').onclick = function(){
    //  Make a request to the counter end point
    
    //capture the response and store in variable
    
    //Render the variable in a correct span
    
     counter = counter + 1;
    document.getElementById('count').innerHTML = counter.toString();
};
};