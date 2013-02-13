var mongoose      = require('mongoose');
var Album         = require('../models/album');

var AlbumsController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

AlbumsController.prototype.GET = function () {
  var self = this
  var album = new Album();
  Album.find().exec(function (err, albums) {
    self.res.render('albums/index', {album: album, albums: albums});
  });
};

AlbumsController.prototype.POST = function () {
  var self = this;
  var album = new Album(self.req.body.album);
  album.save(function (err) {
    if (err &! album.errors)
      throw err;
    
    if (err) {
      Album.find(function (err, albums) {
        if (err)
          throw err;
          
        self.res.render('albums/index', {album: album, albums: albums});
      });
    } else {  
      self.res.redirect('/albums');
    }
  });
};

module.exports = AlbumsController;
