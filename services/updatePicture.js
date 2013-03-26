var Album   = require("../models/album");
var Picture = require("../models/picture");

var updatePicture = function (pictureAttributes, callback) {
  if (!pictureAttributes.homePage) {
    pictureAttributes.homePage = false;
  }
  if (!pictureAttributes.toSale) {
    pictureAttributes.toSale = false;
  }

  Picture.findByIdAndUpdate(pictureAttributes.id).exec(function (err, picture) {
    if (err) return callback(err);

    picture.name = pictureAttributes.name;
    picture.creationDate = pictureAttributes.creationDate;
    picture.description = pictureAttributes.description;
    picture.homePage = pictureAttributes.homePage;
    picture.toSale = pictureAttributes.toSale;

    if (!picture.album && pictureAttributes.album) {
      Album.findById(pictureAttributes.album, function (err, album) {
        if (err) return callback(err);

        album.pictures.push(picture.id);

        album.save(function (err) {
          if (err) return callback(err);

          picture.album = album.id;
          picture.albumIndex = album.pictures.length +1 ;

          picture.save(function (err) {
            if (err) return callback(err);

            callback(null, picture);
          });
        });
      });
    } else if (pictureAttributes.album && pictureAttributes.album != picture.album) {
      Album.findById(picture.album, function (err, album) {
        if (err) return callback(err);

        album.pictures.remove(picture.id);
        album.save(function (err) {
          if (err) return callback(err);

          Album.findById(pictureAttributes.album, function (err, album) {
            if (err) return callback(err);

            album.pictures.push(picture.id);

            album.save(function (err) {
              if (err) return callback(err);

              picture.album = album.id;
              picture.albumIndex = album.pictures.length + 1;

              picture.save(function (err) {
                if (err) return callback(err);

                callback(null, picture);
              });
            });
          });
        })
      });
    } else {
      picture.save(function (err) {
        if (err) return callback(err);

        callback(null, picture);
      });
    }
  });
};

module.exports = updatePicture;