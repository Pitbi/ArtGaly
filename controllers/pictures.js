var im              = require("imagemagick");
var async           = require("async");
var fs              = require("fs");

var mongoose        = require("mongoose");
var Album           = require("../models/album");
var Picture         = require("../models/picture");

var PicturesController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

PicturesController.prototype.POST = function () {
  var self = this;
  if (self.req.files.pictures[1]) {
    async.forEachSeries(self.req.files.pictures, function (uploadedPicture, callback) {
      Picture.saveUploadedPicture(uploadedPicture, self.req.body.pictures.album, function (err) {
        if (err) return callback(err);
        
        callback();
      }); 
    }, function (err) {
      if (err) return callback(err);
      
      self.res.redirect("/album/" + self.req.body.pictures.album);
    });
  } else {
    Picture.saveUploadedPicture(self.req.files.pictures, self.req.body.pictures.album, function (err) {
      if (err) throw err;
        
      self.res.redirect("/album/" + self.req.body.pictures.album);;
    });  
  }
};



module.exports = PicturesController;
