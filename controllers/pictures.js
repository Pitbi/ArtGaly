var im                  = require("imagemagick");
var async               = require("async");
var fs                  = require("fs");
var mongoose            = require("mongoose");
var Album               = require("../models/album");
var Picture             = require("../models/picture");
var saveUploadedPicture = require("../services/uploadImage");
var requireUser         = require ("../services/requireUser");

var PicturesController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

PicturesController.prototype.POST = function () {
  var self = this;
  requireUser(self.req, self.res, function () {
    if (self.req.files.pictures[1]) {
      async.forEachSeries(self.req.files.pictures, function (uploadedPicture, callback) {
        saveUploadedPicture(uploadedPicture, self.req.body.pictures.album, function (err) {
          if (err) throw err;
          
          callback();
        });
      }, function (err) {
        if (err) return callback(err);
        
        self.res.redirect("/album/" + self.req.body.pictures.album);
      });
    } else if (self.req.files.pictures[0]) {
      saveUploadedPicture(self.req.files.pictures, self.req.body.pictures.album, function(err) {
        if (err) throw err;
          
        self.res.redirect("/album/" + self.req.body.pictures.album);
      });
    } else {
      self.res.redirect("/album/" + self.req.body.pictures.album);
    }
  });
};

PicturesController.prototype.DELETE = function () {
  var self = this;
  requireUser(self.req, self.res, function () {
    Picture.find({album: undefined}, function(err, pictures) {
      pictures.forEach(function (picture) {
        picture.remove();
      })
      self.res.redirect("/admin");
    });
  });
};



module.exports = PicturesController;
