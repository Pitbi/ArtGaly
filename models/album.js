var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var albumSchema = new mongoose.Schema ({
	name          : {type: String, validate: [/^.{3,25}$/, "Le nom de l'abum doit contenir minimum 3 charactères et maximum 25."]},
	pictures      : {type: [Schema.ObjectId], ref: "Picture"},
	description   : String,
	use           : Boolean,
	creationDate  : {type: Date, default: Date.now}
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;
