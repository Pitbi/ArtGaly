var Album = require("../models/album");
var requireUser = require("../services/requireUser");

var AlbumController = function(req, res, next) {
  this.req = req;
  this.res = res;
  return this;
};

AlbumController.prototype.GET = function () {
  var self = this;
  var albumId = /album\/(.*)$/.exec(self.req.url);
  Album.findById(albumId[1]).populate("pictures").exec(function (err, album) {
    if (err)
      throw err;
      
    self.res.render("albums/show", {album: album});
  });
};

AlbumController.prototype.PUT = function () {
  var self = this;
  var albumAttributes = self.req.body.album;
  requireUser(self.req, self.res, function () {
    Album.findById(albumAttributes.id, function (err, album) {
      if (albumAttributes.cover) {
        album.cover = albumAttributes.cover;
      } else {
        album.name = albumAttributes.name;
        album.description = albumAttributes.description;
      }
      album.save(function (err) {
        if (err &! album.errors)
          throw err;
        
        if (err) {
          var errors = album.errors;
          Album.findById(albumAttributes.id).populate("pictures").exec(function (err, album) {
            if (err)
              throw err;
              
            album.errors = errors;
            self.res.render("albums/show", {album: album});
          });
        } else {
          self.res.redirect("/album/" + album.id);
        }
      });
    });
  });
};  

AlbumController.prototype.DELETE = function () {
  var self = this;
  requireUser(self.req, self.res, function () {
    Album.findById(self.req.body.album.id, function (err, album) {
      if (err)
        throw err;
      
      album.remove();
      setTimeout(function(){
        self.res.redirect('/albums')
      },1000);
    });
  });
};

module.exports = AlbumController;
