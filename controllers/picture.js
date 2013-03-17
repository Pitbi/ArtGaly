var mongoose        = require("mongoose");
var Album           = require("../models/album");
var Picture         = require("../models/picture");
var requireUser     = require ("../services/requireUser");

var PictureController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

PictureController.prototype.GET = function () {
  var self = this;
  var pictureId = /picture\/(.*)$/.exec(self.req.url);
  Picture.findById(pictureId[1]).populate("album").exec(function (err, picture) {
    if (err) throw err;

    Album.find().exec(function (err, albums) {
      if (err) throw err;

      if (picture.album) {
        Picture.find({'_id': { $in: picture.album.pictures}}, function(err, pictures) {
          self.res.render("pictures/show", {picture: picture, pictures: pictures, albums: albums})
        });
      } else {
        var pictures = {};
        self.res.render("pictures/show", {picture: picture, pictures: pictures, albums: albums})
      }
    });
  });
};

PictureController.prototype.PUT = function () {
  var self = this;
  requireUser(self.req, self.res, function () {
    var pictureAttributes = self.req.body.picture;
    if (!pictureAttributes.homePage) {
      pictureAttributes.homePage = false;
    }
    console.log(pictureAttributes);
    Picture.findByIdAndUpdate(pictureAttributes.id, pictureAttributes, function (err, picture) {
      self.res.redirect("/picture/" + pictureAttributes.id);
    });
  });
};

PictureController.prototype.DELETE = function () {
  var self = this;
  requireUser(self.req, self.res, function () {
    Picture.findById(self.req.body.picture.id, function (err, picture) {
      if (err)
        throw err;

      picture.remove();
      self.res.redirect('/');
    });
  });
};


module.exports = PictureController;
