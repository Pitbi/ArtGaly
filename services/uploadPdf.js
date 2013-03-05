var fs       = require("fs"); 

var Book     = require("../models/book");

var saveUploadedBook = function saveUploadedBook(uploadedBook, callback) {
	var book = new Book();
	var outputPath = "./public/user-books/" + book.id + ".pdf";
	var path = "/user-books/" + book.id + ".pdf";
	book.path= path;

	book.save(function (err) {
		if (err) throw err;
		fs.rename(uploadedBook.path, outputPath, function (err) {
			if (err) throw err;

			callback();
		});
	});
}

module.exports = saveUploadedBook;