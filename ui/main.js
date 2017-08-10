//counter code

var button = document.getElementById('counter');

var counter = 0;

button.onclick = function(){
    //  Make a request to the counter end point
    
    //capture the response and store in variable
    
    //Render the variable in a correct span
    
     counter = counter + 1;
     var span = document.getElementById('count');
     span.innerHtml = counter.toString();
};