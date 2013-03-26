var Album   = require("../models/album");
var Picture = require("../models/picture");

var movePictureInAlbum = function (pictureAttributes, callback) {
	Picture.findById(pictureAttributes.id, function (err, picture) {
	  if (err) return callback();

	  picture.albumIndex = pictureAttributes.albumIndex;
	  picture.save(function (err) {
	    if (err) return callback(err);

	    Album.findById(picture.album).populate("pictures").exec(function (err, album) {
	      if (err) return callback(err);
	      var replacedPicture;
	      album.pictures.forEach(function (albumPicture) {
	        if (picture.id != albumPicture.id && albumPicture.albumIndex == pictureAttributes.albumIndex) {
	          replacedPicture = albumPicture.id;
	      console.log(replacedPicture);
	        }
	      });
	      Picture.findById(replacedPicture, function (err, picture) {
	        if (err) return callback(err);
	        picture.albumIndex = pictureAttributes.oldAlbumIndex;

	        picture.save(function (err) {
	          if (err) return callback(err);

	          callback(null, album);
	        }) 
	      })
	    });
	  });
	});
};

module.exports = movePictureInAlbum;