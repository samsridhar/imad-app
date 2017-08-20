var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Pool = require('pg').Pool;

var config = {
  user: 'samsridharmac',
  database: 'samsridharmac',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
    
}; 

var articles = {
    'article-one':{
        title: 'article-one',
        heading: 'article-one',
        date: 'sep 27,2017',
        content: `<p>
                 hi hello everybody welcome to spaceship.
                 hi hello everybody welcome to spaceship.
                 </p>
               <p>
                  hi hello everybody welcome to spaceship.
                  hi hello everybody welcome to spaceship
                  </p>`
    },
    'article-two':{
         title: 'article-two',
         heading: 'article-two',
         date: 'sep 28,2017',
         content: `<p>
                 hi hello everybody welcome to spaceship on 28.
                 hi hello everybody welcome to spaceship on 28.
                 </p>
               <p>
                  hi hello everybody welcome to spaceship.
                  hi hello everybody welcome to spaceship
                  </p>`
    },
    'article-three':{
         title: 'article-three',
         heading: 'article-three',
         date: 'sep 29,2017',
         content: `<p>
                 hi hello everybody welcome to spaceship 17.
                 hi hello everybody welcome to spaceship 17.
                 </p>
               <p>
                  hi hello everybody welcome to spaceship.
                  hi hello everybody welcome to spaceship
                  </p>`
    }
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
            ${date}
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

var pool = new Pool(config);

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
//SELECT * FROM article WHERE title = 'article-one'    
pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName + "'", function(err, result){
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
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
