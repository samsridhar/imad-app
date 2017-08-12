var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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


app.get('/:articleName', function(req, res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var names = [];

app.get('/list/:name', function(){
   var name = req.params.name;
   names.push(name);
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
