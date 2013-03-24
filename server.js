var express       = require("express");
var mongoose      = require("mongoose");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var viewHelpers = require("./helpers/view_helpers");
var config      = require("./config/config");

var HomeController      = require("./controllers/home");
var AdminController     = require("./controllers/admin");
var AlbumsController    = require("./controllers/albums");
var AlbumController     = require("./controllers/album");
var PicturesController  = require("./controllers/pictures");
var PictureController   = require("./controllers/picture");
var NewsController      = require("./controllers/news");
var NewController       = require("./controllers/new");
var BooksController     = require("./controllers/books");
var CommentsController  = require("./controllers/comments");
var LoginController     = require("./controllers/login");
var LogoutController    = require("./controllers/logout");
var OfferController     = require("./controllers/offer");
var ContactController   = require("./controllers/contact");

//Mongo/Mongoose

var mongoUri = process.env.MONGO_URI || "mongodb://localhost/artgaly";

mongoose.connect(mongoUri, function(error) {
  if (error) { throw error; }
});

var Album = require("./models/album");
var Picture = require("./models/picture");

//SERVER

var server = express.createServer();

server.configure(function () {
  server.use(express.logger({format: "dev", stream: process.stdout}));
  server.use(express.static(__dirname + "/public")); // sert les "assets" (fichiers statiques genre html, css, jpg...)
  server.use(express.bodyParser());
  server.use(express.methodOverride());
	server.use(express.cookieParser());
  server.use(express.session({store: config.sessions.store, secret: config.sessions.secret}));;
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(function (req, res, next) { req.member = req.user; next(); });
  server.use(server.router);
  server.set("view engine", "ejs");
  //server.set("views", __dirname + "/app/views");
  server.set("view options", {
    layout: "layouts/application"
  });
  server.dynamicHelpers(viewHelpers);
});


server.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

//HTTP REQUEST

var routes = {
  "/"           : HomeController,
  "/albums"     : AlbumsController,
  "/album/:id"  : AlbumController,
  "/pictures"   : PicturesController,
  "/picture/:id": PictureController,
  "/admin"      : AdminController,
  "/news"       : NewsController,
  "/books"      : BooksController,
  "/comments"   : CommentsController,
  "/login"      : LoginController,
  "/logout"     : LogoutController,
  "/offer"      : OfferController,
  "/contact"    : ContactController
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
