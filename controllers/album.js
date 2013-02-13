var Album = require("../models/album");

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
  Album.findById(self.req.body.album.id, function (err, album) {
    album.name = self.req.body.album.name;
    album.description = self.req.body.description;
    album.save(function (err) {
      if (err &! album.errors)
        throw err;
      
      if (err) {
        var errors = album.errors;
        Album.findById(self.req.body.album.id, function (err, album) {
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
};  

AlbumController.prototype.DELETE = function () {
  var self = this;
  Album.findByIdAndRemove(self.req.body.album.id, function (err) {
    if (err)
      throw err;
    
    self.res.redirect('/albums');
  });
};

module.exports = AlbumController;
