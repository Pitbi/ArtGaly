var mongoose = require("mongoose");
var fs       = require("fs");
var async    = require("async");
var im       = require("imagemagick");
var email    = require("emailjs/email");


var Album    = require("./album");

var Schema   = mongoose.Schema;

var commentSchema = Schema({
  sender     : {type: String, validate: [/^.{3,25}$/, "Votre nom doit contenir minimum 3 charactères et maximum 25."]},
  senderMail : String,
  message    : {type: String, validate: [/^.{3,}/, "Votre message doit contenir minimum 3 charactères."]},
  date       : {type: Date, default: Date.now} 
});

var offerSchema = Schema({
  sender        : {type: String, validate: [/^.{3,25}$/, "Votre nom doit contenir minimum 3 charactères et maximum 25."]},
  senderMail    : {type: String, validate: [function(value) { return /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z0-9.\-_]{2,}.[a-zA-Z0-9.\-_]{2,}$/.test(value) }, "Nous avons besoin d'une adresse mail valide pour vous répondre."]},
  message       : String,
  date          : {type: Date, default: Date.now},
  proposedPrice : {type: Number, validate: [/^.{1,}$/, "Veuillez introduire un montant pour votre offre."]},
  phoneNumber   : Number
});

var pictureSchema = new Schema ({
	name            : String,
	homePage        : Boolean,
	pathOriginalSize: String,
	pathLittleSize  : String,
	extension       : String,
	album           : {type: Schema.ObjectId, ref: "Album"},
  albumIndex      : Number,
	description     : String,
	creationDate    : Date,
  toSale          : Boolean,
	uploadDate      : {type: Date, default: Date.now},
  comments        : [commentSchema],
  offers          : [offerSchema]
});

pictureSchema.pre('remove', true, function (next, done) {
  var self = this;
  Album.findById(self.album).exec(function (err, album) {
    if (err) return done(err);

    var pictureIndex = album.pictures.indexOf(self.id);
    delete album.pictures[pictureIndex];

    album.save(function (err) {
      if (err) return done(err);
      done();
    });
  });
});

pictureSchema.methods.sendOfferByMail = function(smtpConfig, offer, callback) {
  var server  = email.server.connect({
    user: smtpConfig.user,
    password: smtpConfig.password,
    host: smtpConfig.host,
    ssl: true
  });
  server.send({
    text:    "Nouvelle offre pour " + this.name + " ("+ offer.proposedPrice +" €). Venant de " + offer.sender + " (" + offer.senderMail + "), consultez votre site pour de plus amples informations.",
    from:    smtpConfig.sender,
    to:      "pierre.biezemans@gmail.com",
    subject: "Envoie d'une offre pour" + offer.name
  }, callback);
};


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
