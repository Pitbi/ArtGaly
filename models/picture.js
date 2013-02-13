var mongoose = require("mongoose");
var fs       = require("fs");
var Schema   = mongoose.Schema;
var Album    = require("./album");

var pictureSchema = new mongoose.Schema ({
	name        : String,
	homePage    : Boolean,
	path        : String,
	extension   : String,
	album       : {type: Schema.ObjectId, ref: "Album"},
	description : String,
	creationDate  : Date,
	uploadDate    : {type: Date, default: Date.now}
});

var Picture = mongoose.model("Picture", pictureSchema);

Picture.saveUploadedPicture = function saveUploadedPicture(uploadedPicture, albumId, callback) {
  var picture = new Picture();
  var picturePathAttribute = buildPicturePathAttributes(uploadedPicture, picture.id);
  picture.path       = picturePathAttribute.path;
  picture.extenstion = picturePathAttribute.extension;
  picture.album      = albumId;
  picture.save(function (err) {
    if (err) return callback(err);
       
    fs.rename(picturePathAttribute.uploadPath, picturePathAttribute.outputPath, function (err) {
      if (err) return callback(err);
      
      Album.addPicture(albumId, picture.id, function (err) {
       if (err) callback(err);       
         callback();
      });
    });
  });
};

module.exports = Picture;


function buildPicturePathAttributes(uploadedPicture, pictureId) {
  var fileName            = uploadedPicture.name;
  var parseUploadFileName = /\.(.*)$/.exec(fileName);
  var extension           = parseUploadFileName[1];
  var pathPictureAttributes = {
    uploadPath: uploadedPicture.path,
    fileName  : uploadedPicture.name, 
    extension : extension,
    outputPath: "./public/user-pics/" + pictureId + "." + extension,
    path      : "/user-pics/" + pictureId + "." + extension
  };
  return pathPictureAttributes;
};
