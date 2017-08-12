//counter code
document.getElementById('click').onclick = function(){
  //create a request
 var request = new XMLHttpRequest();  
 
 //capture the response and store it in a variable
 
request.onreadystatechange = function(){
    console.log(document.getElementById('count').innerHTML.value);
 if(request.readystate === XMLHttpRequest.DONE){
     //Take some action
     if(request.status === 200){
         var counter = request.responseText;
         console.log(counter);
         document.getElementById('count').innerHTML = counter.toString();
     }
     
 }
    //NOT done YET
};
     //Make a  request to the counter Endpoint
    request.open('GET','http://samsridharmac.imad.hasura-app.io/counter',true);
    request.send(null);
};

