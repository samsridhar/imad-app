var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
var Pool = require('pg').Pool;

var crypto = require('crypto');

var config = {
  user: 'samsridharmac',
  database: 'samsridharmac',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
    
}; 

function createTemplate (data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
   <html>
  <head>
    <title>
        ${title}
     </title>
     <link href="ui/style.css" rel="stylesheet"/>
     <meta name ="viewport" content="width=device-width,inital-scale=1"/>
    </head>
 <body>
   <div class="container">
         <div>
            <a href ="/"> Home </a>
            </div>
         <hr/>
         <h3>
            ${heading}
         </h3>
         <div>
            ${date.toDateString()}
             </div>
          <div>
              ${content}
            </div>    
             
   </div>
  </body>
  </html> 
  `;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    //How do we create hash
  var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
  return ['pbkdf2', '1000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});


var pool = new Pool(config);

app.post('/create-user', function(req, res){
    //username, password
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username, dbString], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send('User successfully created'+username);
        }
    });
});

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * from "user" WHERE username = $1', [username], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            if(result.rows.length === 0){
                res.send(403).send('Username/password is invalid');
            } else{
                //Match the password
                var dbString = result.rows[0].password;
                var salt = dbString.Split('$')[2];
                var hashedpassword = hash(password,salt); //creating a hash based on the password submitted and the Original salt
                if (hashedpassword === dbString){
                    res.send('Credentials correct');
                } else{
                    res.send(403).send('Username/password is invalid');
                }
                
            }
        }
    });
});

app.get('/test-db', function(req, res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
    else{
        res.send(JSON.stringify(result.rows));
    }    
    });
});

var counter =0;

app.get('/counter', function(req, res){
    counter = counter+1;
    console.log("Counter value is "+counter);
    res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];

app.get('/submit-name', function(req, res){ //URL: /submit-name?name=xxx
    //Get the name from the request
   var name = req.query.name;
   names.push(name);
   //JSON javascript object notation
   res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req, res){
//SELECT * FROM article WHERE title = ''; DELETE WHERE a = 'asdf'
pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){
    if(err){
        res.status(500).send(err.toString());
    }else{
        if(result.rows.length === 0){
            res.status(400).send('Article Not Found');
        }else{
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }

});
});





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
