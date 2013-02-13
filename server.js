var express       = require('express');
var mongoose      = require('mongoose');

var viewHelpers = require('./helpers/view_helpers');

var HomeController      = require('./controllers/home');
var AdminController     = require('./controllers/admin');
var AlbumsController    = require('./controllers/albums');
var AlbumController     = require('./controllers/album');
var PicturesController  = require('./controllers/pictures');
var PictureController   = require('./controllers/picture');

//Mongo/Mongoose

var mongoUri = process.env.MONGO_URI || "mongodb://localhost/artgaly";

mongoose.connect(mongoUri, function(error) {
	if (error) { throw error; }
});

var Album = require('./models/album');
var Picture = require('./models/picture');

//SERVER

var server = express.createServer();

server.configure(function () {
  server.use(express.logger({format: 'dev', stream: process.stdout}));
  server.use(express.static(__dirname + '/public')); // sert les "assets" (fichiers statiques genre html, css, jpg...)
  server.use(express.bodyParser({uploadDir:'./public/uploads'}));
  server.use(express.methodOverride());
	server.use(express.cookieParser());
  server.use(server.router);
  server.set('view engine', 'ejs');
  //server.set('views', __dirname + '/app/views');
  server.set('view options', {
    layout: 'layouts/application'
  });
  server.dynamicHelpers(viewHelpers);
});


//HTTP REQUEST

var routes = {
  "/"           : HomeController,
  "/albums"     : AlbumsController,
  "/album/:id"  : AlbumController,
  "/pictures"   : PicturesController,
  "/picture/:id": PictureController
};

server.use(function (req, res, next) {
  var Controller = findMatchingController(req, res, next);
  if (Controller) {
    var controller = new Controller(req, res, next);
    controller[req.method]();
  } else {
    next();
  }
});

function findMatchingController(req, res, next) {
  var path = req.path;
  for (var i in routes) {
    if (i == path) {
      return routes[i]; 
    } else if (i.match("/:id")) {
      var collection = i.replace("/:id", "")
      var indexOfCollection = path.indexOf(collection);
      if (indexOfCollection == 0) {
        return routes[i];
      }
    }
  }
};

server.listen(process.env.PORT || 5555);
