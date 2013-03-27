var Album   = require("../models/album");
var Picture = require("../models/picture");
var async   = require("async")

var updatePicture = function (pictureAttributes, callback) {
  if (!pictureAttributes.homePage) {
    pictureAttributes.homePage = false;
  }
  if (!pictureAttributes.toSale) {
    pictureAttributes.toSale = false;
  }

  console.log(pictureAttributes);
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
          picture.albumIndex = album.pictures.length;

          picture.save(function (err) {
            if (err) return callback(err);

            callback(null, picture);
          });
        });
      });
    } else if (pictureAttributes.album && pictureAttributes.album != picture.album) {
      Album.findById(picture.album).populate("pictures").exec(function (err, album) {
        if (err) return callback(err);

        var pictureIndex;
        async.forEachSeries(album.pictures, function (albumPicture, done) {
        if (albumPicture.albumIndex > picture.albumIndex) {
          albumPicture.albumIndex -= 1;
          albumPicture.save();
        } else if (albumPicture.id == picture.id) {
          pictureIndex = album.pictures.indexOf(albumPicture);
        } 
        done();
      }, function (err) {
        if (err) throw err;

        album.pictures.splice(pictureIndex, 0);
        album.save(function (err) {
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
                  picture.albumIndex = album.pictures.length;

                  picture.save(function (err) {
                    if (err) return callback(err);

                    callback(null, picture);
                  });
                });
              });
            })
          });
        });
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