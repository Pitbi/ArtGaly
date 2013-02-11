var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pictureSchema = new mongoose.Schema ({
	name        : String,
	fileName    : String,
	homePage    : Boolean,
	album       : {type: Schema.ObjectId, ref: "Album"},
	description : String,
	creationDate  : Date,
	uploadDate    : {type: Date, default: Date.now}
});

var Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
