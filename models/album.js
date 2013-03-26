var mongoose = require("mongoose");
var async    = require("async");


var Schema   = mongoose.Schema;
var albumSchema = new Schema ({
	name          : {type: String, validate: [/^.{3,25}$/, "Le nom de l'abum doit contenir minimum 3 charactères et maximum 25."]},
	pictures      : [{type: Schema.ObjectId, ref: "Picture"}],
	description   : String,
	use           : Boolean,
	cover         : {type: Schema.ObjectId, ref: "Picture"},
	creationDate  : {type: Date, default: Date.now}
});

var Album = mongoose.model("Album", albumSchema);

albumSchema.pre('remove', true, function (next, done) {
  next();
  var self = this;
  var Picture  = require("./picture");
  Picture.find({album: self.id}).exec(function (err, pictures) {
    if (err) return done(err);
    
    async.forEachSeries(pictures, function (picture, callback) {
      picture.album = null;
      picture.albumIndex = 0;
      picture.save(function (err) {
        if (err) return callback(err);
        
        callback();
      });
    }, function (err) {
      if (err) return done(err);
      
      done();
    });  
  });
});

Album.addPicture = function addPicture(albumId, pictureId, callback) {
  Album.findById(albumId, function (err, album) {
    if (err) return callback(err);
    
    album.pictures.push(pictureId);
    album.save(function (err) {
      if (err) return callback(err);
      
      callback(null, album);
    });
  });
};

module.exports = Album;
