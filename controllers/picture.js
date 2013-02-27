var mongoose        = require("mongoose");
var Album           = require("../models/album");
var Picture         = require("../models/picture");

var PictureController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

PictureController.prototype.GET = function () {
  var self = this;
  var pictureId = /picture\/(.*)$/.exec(self.req.url);
  Picture.findById(pictureId[1]).populate("pictures").exec(function (err, picture) {
    if (err)
      throw err;
      
    self.res.render("pictures/show", {picture: picture});
  })
};

PictureController.prototype.PUT = function () {
  var self = this;
  var pictureAttributes = self.req.body.picture;
  if (!pictureAttributes.homePage) {
    pictureAttributes.homePage = false;
  }
  console.log(pictureAttributes);
  Picture.findByIdAndUpdate(pictureAttributes.id, pictureAttributes, function (err, picture) {
    self.res.redirect("/picture/" + pictureAttributes.id);
  });
};

module.exports = PictureController;
