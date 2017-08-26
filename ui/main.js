//Submit UserName/Password to login

var submit = document.getElementById('submit_btn');
submit.onclick = function(){
       //create a request
 var request = new XMLHttpRequest();  
 
 //capture the response and store it in a variable
 
request.onreadystatechange = function(){
    console.log("i am in");
 if(request.readyState === XMLHttpRequest.DONE){
     //Take some action
     console.log("i am in");
     if(request.status === 200){
        console.log('User LoggedIN');
        alert('user successfully logged in');
     } else if(request.status === 403){
         alert('Username/Password is not valid');
     } else if (request.status === 500){
         alert('something went wrong on the server');
     }
     
 }
    //NOT done YET
};
     //Make a  request to the counter Endpoint
     var username = document.getElementById('username').value;
     var password = document.getElementById('password').value;
     console.log(username);
     console.log(password);
    request.open('POST','http://samsridharmac.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username:username, password:password}));
};
  
      
      
