//Adapted from: http://itblog.mobi/2015/12/29/how-to-create-a-simple-restful-api-with-node-js/

var express = require("express");
var ipfilter = require('express-ipfilter');

var app = express();

// IP Whitelist - closes off access outside this building.
var ips = ['165.127.116.219'];

//app.use(ipfilter(ips, {mode: 'allow'}));
//Because: Access denied to IP address: ::ffff:172.17.0.3

app.use(express.static('coloradodemography.github.io/_site'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var routes = require("./routes/routes.js")(app);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

var server = app.listen(4008, function() {
    console.log("Listening on port %s...", server.address().port);
});
  