//counter code
document.getElementById('click').onclick = function(){
  //create a request
 var request = new XMLHttpRequest();  
 
 //capture the response and store it in a variable
 
request.onreadystatechange = function(){
    console.log("i am in");
 if(request.readyState === XMLHttpRequest.DONE){
     //Take some action
     console.log("i am in");
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

   //Submit Name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
      //Make a request to the server and send name
      
      //capture a list of names and render it as a list
var names = ['name1', 'name2', 'name3'];
var list = '';
for(var i=0; i<names.length; i++){
    list += '<li>' + names[i] + '<li>';
}

var ul = document.getElementById('namelist');
ul.innerHTML = list;
      
      
};