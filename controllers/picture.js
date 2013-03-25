var mongoose        = require("mongoose");
var Album           = require("../models/album");
var Picture         = require("../models/picture");
var requireUser     = require("../services/requireUser");
var async           = require("async");

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
      Picture.findById(pictureAttributes.id, function (err, picture) {
        if (err) throw err;

        picture.albumIndex = pictureAttributes.albumIndex;
        picture.save(function (err) {
          if (err) throw err;

          Album.findById(picture.album).populate("pictures").exec(function (err, album) {
            if (err) throw err;
            var replacedPicture;
            album.pictures.forEach(function (albumPicture) {
              if (picture.id != albumPicture.id && albumPicture.albumIndex == pictureAttributes.albumIndex) {
                replacedPicture = albumPicture.id;
              }
            });
            Picture.findById(replacedPicture, function (err, picture) {
              if (err) throw err;
              picture.albumIndex = pictureAttributes.oldAlbumIndex;

              picture.save(function (err) {
                if (err) throw err;

                self.res.redirect("/album/" + album.id)
              }) 
            })
          });
        });
      });
    } else {
      if (!pictureAttributes.homePage) {
        pictureAttributes.homePage = false;
      }
      if (!pictureAttributes.toSale) {
        pictureAttributes.toSale = false;
      }
      Picture.findByIdAndUpdate(pictureAttributes.id).exec(function (err, picture) {
        if (err) throw err;

        picture.name = pictureAttributes.name;
        picture.creationDate = pictureAttributes.creationDate;
        picture.description = pictureAttributes.description;
        picture.homePage = pictureAttributes.homePage;
        picture.toSale = pictureAttributes.toSale;
        if (!picture.album && pictureAttributes.album) {
          Album.findById(pictureAttributes.album, function (err, album) {
            if (err) throw err;

            album.pictures.push(picture.id);

            album.save(function (err) {
              if (err) throw err;

              picture.album = album.id;

              picture.save(function (err) {
                if (err) throw err;

                self.res.redirect("/picture/" + pictureAttributes.id);
              });
            });
          });
        } else if (pictureAttributes.album && pictureAttributes.album != picture.album) {
          Album.findById(picture.album, function (err, album) {
            if (err) throw err;

            album.pictures.remove(picture.id);
            album.save(function (err) {
              if (err) throw err;

              Album.findById(pictureAttributes.album, function (err, album) {
                if (err) throw err;

                album.pictures.push(picture.id);

                album.save(function (err) {
                  if (err) throw err;

                  picture.album = album.id;
                  picture.albumIndex = album.pictures.length;

                  picture.save(function (err) {
                    if (err) throw err;

                    self.res.redirect("/picture/" + pictureAttributes.id);
                  });
                });
              });
            })
          });
        } else {
          picture.save(function (err) {
            if (err) throw err;

            self.res.redirect("/picture/" + pictureAttributes.id);
          });
        }
      });
    }
  });
};

PictureController.prototype.DELETE = function () {
  var self = this;
  requireUser(self.req, self.res, function () {
    Picture.findById(self.req.body.picture.id, function (err, picture) {
      if (err)
        throw err;

      Album.findById(picture.album).populate("pictures").exec(function (err, album) {
        if (err) throw err;
        
        console.log(album.id);
        async.forEachSeries(album.pictures, function (albumPicture, callback) {
          console.log(albumPicture.albumIndex, picture.albumIndex);
          if (albumPicture.albumIndex > picture.albumIndex) {
            console.log(":D");
            albumPicture.albumIndex = albumPicture.albumIndex -1;
            albumPicture.save(callback);
          } else {
            callback();
          }
        }, function (err) {
          if (err) throw (err);
          
          picture.remove();
          self.res.redirect('/admin');
        });
      });
    });
  });
};


module.exports = PictureController;
