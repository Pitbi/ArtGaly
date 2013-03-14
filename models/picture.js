var mongoose = require("mongoose");
var fs       = require("fs");
var async    = require("async");
var im       = require("imagemagick");

var Album    = require("./album");

var Schema   = mongoose.Schema;

var commentsSchema = Schema({
  sender     : {type: String, validate: [/^.{3,25}$/, "Votre nom doit contenir minimum 3 charactères et maximum 25."]},
  senderMail : String,
  message    : {type: String, validate: [/^.{3,}/, "Votre message doit contenir minimum 3 charactères."]},
  date       : {type: Date, default: Date.now} 
});

var pictureSchema = new Schema ({
	name            : String,
	homePage        : Boolean,
	pathOriginalSize: String,
	pathLittleSize  : String,
	extension       : String,
	album           : {type: Schema.ObjectId, ref: "Album"},
	description     : String,
	creationDate    : Date,
  toSale          : Boolean,
	uploadDate      : {type: Date, default: Date.now},
  comments        : [commentsSchema]
});

var Picture = mongoose.model("Picture", pictureSchema);

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

module.exports = Picture;
