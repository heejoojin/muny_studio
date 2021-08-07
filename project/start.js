var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');

// Set up the app's routing
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/about', function(request, response) {
  response.render('pages/about');
});

app.get('/class', function(request, response) {
  response.render('pages/class');
});

app.get('/contact', function(request, response) {
  response.render('pages/contact');
});

app.get('/location', function(request, response) {
  response.render('pages/location');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});