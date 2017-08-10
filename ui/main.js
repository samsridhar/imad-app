//counter code




document.getElementById('counter').onclick = function(){
    //  Make a request to the counter end point
    
    //capture the response and store in variable
    
    //Render the variable in a correct span
    var counter = 0;
     counter = counter + 1;
    document.getElementById('count').innerHtml = counter.toString();
};