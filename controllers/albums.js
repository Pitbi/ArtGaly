var Album         = require("../models/album");
var requireUser   = require("../services/requireUser");

var AlbumsController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

AlbumsController.prototype.GET = function () {
  var self = this
  var album = new Album();
  Album.find().populate('cover').exec(function (err, albums) {
    self.res.render('albums/index', {album: album, albums: albums});
  });
};

AlbumsController.prototype.POST = function () {
  var self = this;
  var album = new Album(self.req.body.album);  
  requireUser(self.req, self.res, function () {
    album.save(function (err) {
      if (err &! album.errors)
        throw err;
      
      if (err) {
        Album.find().populate('cover').exec(function (err, albums) {
          if (err)
            throw err;
            
          self.res.render('albums/index', {album: album, albums: albums});
        });
      } else {  
        self.res.redirect('/albums');
      }
    });
  });
};

module.exports = AlbumsController;
