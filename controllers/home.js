var Picture     = require("../models/picture");
var Home        = require("../models/home");
var requireUser = require ("../services/requireUser");

var HomeController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

HomeController.prototype.GET = function () {
  var self= this;
  Picture.find({homePage: true}, function (err, pictures) {
    if (err) throw err;
    
    Picture.find().sort({'uploadDate': 'desc', test: -1}).limit(12).exec(function (err, lastAddedPictures) {
    	if (err) throw err;

      Home.findOrCreate(function (err, home) {
        self.res.render("home/show", {pictures: pictures, lastAddedPictures: lastAddedPictures, home: home});
      });
    });
  });
};

HomeController.prototype.PUT = function () {
  var self= this;
  requireUser(self.req, self.res, function () {
    Home.findByIdAndUpdate(self.req.body.home.id, self.req.body.home, function (err, home) {
      if (err) throw err;

      self.res.redirect("/");
    });
  });
};

module.exports = HomeController;
