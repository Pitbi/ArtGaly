var Album = require('../models/album');

var AlbumController = function(req, res, next) {
  this.req = req;
  this.res = res;
  return this;
};

AlbumController.prototype.GET = function () {
  var self = this;
  var url = self.req.url;
  var albumId = /album\/(.*)$/.exec(url);
  console.log(albumId);
  Album.findById(albumId[1], function (err, album) {
    if (err)
      throw err;
      
    self.res.render('albums/show', {album: album});
  });
};

AlbumController.prototype.POST = function () {
  var self = this;
  var album = new Album(self.req.body.album);
  album.save(function (err) {
    if (err)
      throw err;
    
    self.res.redirect('/albums');
  });
};

module.exports = AlbumController;
