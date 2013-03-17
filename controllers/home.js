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
  var attributes = self.req.body.home;
  console.log(":D", attributes);
  requireUser(self.req, self.res, function () {
    Home.findById(attributes.id, function (err, home) {
      if (err) throw err;

      if (attributes.updateText) {
        home.text1 = attributes.text1;
      } 
      if (attributes.updateOptions) {
        if (attributes.carousel) {
          home.carousel = true;
        } else {
          home.carousel = false;
        }
        if (attributes.pictureUpdate) {
          home.pictureUpdate = true;
        } else {
          home.pictureUpdate = false;
        }
      }

      home.save(function (err) {
        if (err) throw err;

        self.res.redirect("back");
      });

    });
  });
};

module.exports = HomeController;
