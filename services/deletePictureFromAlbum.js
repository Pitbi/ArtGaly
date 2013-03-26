var Album   = require("../models/album");
var Picture = require("../models/picture");
var async   = require("async");
var fs      = require("fs");

var deletePicture = function (pictureId, callback) {
  Picture.findById(pictureId, function (err, picture) {
    if (err) return callback(err);

    var pictureIndex;
    Album.findById(picture.album).populate("pictures").exec(function (err, album) {
      if (err) return callback(err);

      async.forEachSeries(album.pictures, function (albumPicture, done) {
        console.log(albumPicture.albumIndex);
        if (albumPicture.albumIndex > picture.albumIndex) {
          albumPicture.albumIndex -= 1;
          albumPicture.save();
        } else if (albumPicture.id == picture.id) {
           pictureIndex = album.pictures.indexOf(albumPicture);
        } 
        done();
      }, function (err) {
        if (err) throw err;

        album.pictures.splice(pictureIndex, 1);
        album.save(function (err) {
          if (err) return callback(err);
          
          console.log(picture);
          //fs.unlink(__dirname + "/public" + picture.pathOriginalSize, function (err) {
          //  if (err) return callback(err);

          //  fs.unlink(picture.pathLittleSize, function (err) {
          //    if (err) return callback(err);

              picture.remove(function (err) {
                if (err) return callback(err);

                callback(null, album);
              });
          //  });
          //});
        });
      });
    });
  });   
};

module.exports = deletePicture;