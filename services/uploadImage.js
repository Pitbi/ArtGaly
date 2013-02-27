var im       = require("imagemagick");
var fs       = require("fs"); 

var Picture         = require("../models/picture");
var Album           = require("../models/album");

var saveUploadedPicture = function saveUploadedPicture(uploadedPicture, albumId, callback) {
  var picture = new Picture();
  var picturePathAttribute = buildPicturePathAttributes(uploadedPicture, picture.id);
  im.crop({
    srcPath: picturePathAttribute.uploadPath,
    dstPath: picturePathAttribute.outputLittleSizePath,
    width: 200,
    height: 150,
    quality: 1,
    gravity: "North"
  }, function(err, stdout, stderr){
    picture.pathLittleSize    = picturePathAttribute.pathLittleSize;
    picture.pathOriginalSize  = picturePathAttribute.pathOriginalSize;
    picture.extenstion        = picturePathAttribute.extension;
    picture.album             = albumId;
    picture.save(function (err) {
      if (err) return callback(err);
         
      fs.rename(picturePathAttribute.uploadPath, picturePathAttribute.outputOriginalSizePath, function (err) {
        if (err) return callback(err);
        
        Album.addPicture(albumId, picture.id, function (err) {
         if (err) callback(err);       
           callback();
        });
      });
    });
  });
};

module.exports = saveUploadedPicture;

function buildPicturePathAttributes(uploadedPicture, pictureId) {
  var fileName            = uploadedPicture.name;
  var parseUploadFileName = /\.(.*)$/.exec(fileName);
  var extension           = parseUploadFileName[1];
  var pathPictureAttributes = {
    uploadPath            : uploadedPicture.path,
    fileName              : uploadedPicture.name, 
    extension             : extension,
    outputLittleSizePath  : "./public/user-pics/" + pictureId + "_little." + extension,
    outputOriginalSizePath: "./public/user-pics/" + pictureId + "_origin." + extension,
    pathLittleSize        : "/user-pics/" + pictureId + "_little." + extension,
    pathOriginalSize      : "/user-pics/" + pictureId + "_origin." + extension
  };
  return pathPictureAttributes;
};

