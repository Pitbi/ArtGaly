var mongoose      = require('mongoose');
var Album         = require('../models/album');

var AlbumsController = function(req, res, next) {
  this.res = res;
  return this;
};

AlbumsController.prototype.GET = function () {
  var self = this
  var album = new Album();
  Album.find().exec(function (err, albums) {
    self.res.render('albums/index', {album: album, albums: albums});
  });
};

module.exports = AlbumsController;
