//counter code
var button = document.getElementById('counter');





button.onclick = function(){
  //create a request
 var request = new XMLHttpRequest();  
 
 //capture the response and store it in a variable
 
request.onreadystatechange = function(){
 if(request.readystate === XMLHttpRequest.DONE){
     //Take some action
     if(request.status === 200){
         var counter = request.responseText;
         document.getElementById('count').innerHTML = counter.toString();
     }
     
 }
    //NOT done YET
};
     //Make a  request to the counter Endpoint
    request.open('GET','http://samsridharmac.imad.hasura-app.io/counter',true);
    request.send(null);
};

