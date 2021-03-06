var fs       = require("fs"); 

var Book     = require("../models/book");

var saveUploadedBook = function saveUploadedBook(uploadedBook, reqBodyBook, callback) {
	var book = new Book();
	var outputPath = "./public/user-books/" + book.id + ".pdf";
	var path = "/user-books/" + book.id + ".pdf";
	book.path= path;
	book.name = reqBodyBook.name;

	book.save(function (err) {
		if (err) return callback(err, book);
		fs.rename(uploadedBook.path, outputPath, function (err) {
			if (err) return callback(err);

			callback(null, book);
		});
	});
}

module.exports = saveUploadedBook;