var mongoose               = require("mongoose");
var Album                  = require("../models/album");
var Picture                = require("../models/picture");
var requireUser            = require("../services/requireUser");
var deletePictureFromAlbum = require("../services/deletePictureFromAlbum");
var movePictureInAlbum     = require("../services/movePictureInAlbum");
var updatePicture          = require("../services/updatePicture");
var async                  = require("async");

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
    if (pictureAttributes.albumIndex) {
      movePictureInAlbum(pictureAttributes, function (err, album) {
        if (err) throw err;

        self.res.redirect("/album/" + album.id);
      }); 
    } else {
      updatePicture(pictureAttributes, function (err, picture) {
        if (err) throw err;

        self.res.redirect("/picture/" + picture.id);
      });
    }
  });
};

PictureController.prototype.DELETE = function () {
  var self = this;
  requireUser(self.req, self.res, function () {
    deletePictureFromAlbum(self.req.body.picture.id, function (err, album) {
      if (err) throw err;

      self.res.redirect("/album/" + album.id);
    });
  });
};


module.exports = PictureController;
