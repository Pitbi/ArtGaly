var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var albumSchema = new mongoose.Schema ({
	name          : String,
	pictures      : {type: [Schema.ObjectId], ref: "Picture"},
	description   : String,
	use           : Boolean,
	creationDate  : {type: Date, default: Date.now}
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;
