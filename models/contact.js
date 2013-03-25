var mongoose = require("mongoose");

var Schema   = mongoose.Schema;

var contactSchema = new Schema ({
	text1     			   : String,
	lastPicturesView 	 : Boolean,
	carousel			     : {type:Boolean, default: true},
  pictureUpdate      : {type:Boolean, default: true}
});

var Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;


