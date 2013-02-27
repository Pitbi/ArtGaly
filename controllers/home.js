var Picture = require("../models/picture");

var HomeController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

HomeController.prototype.GET = function () {
  var self= this;
  Picture.find({homePage: true}, function (err, pictures) {
    if (err) throw err;
    
    self.res.render("home/show", {pictures: pictures});
  });
};

module.exports = HomeController;
