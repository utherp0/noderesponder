var express = require("express");
var app = express();
var ejs = require('ejs');

app.engine('html', ejs.renderFile);

app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var response = process.env.RESPONSE || 'Default response';

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Responder failed, check logs!');
});

app.get('/', function (req,res){
  res.send( '[' + ip + '] ' + response );
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);

