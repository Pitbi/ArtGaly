var mongoose = require("mongoose");

var Schema   = mongoose.Schema;
var bookSchema = new Schema ({
	name          : {type: String, validate: [/^.{3,45}$/, "Le nom du livre doit contenir minimum 3 charactères et maximum 45."]},
  	path          : String,
	description   : String,
	use           : Boolean,
	creationDate  : Date
});

var Book = mongoose.model("Book", bookSchema);



module.exports = Book;
