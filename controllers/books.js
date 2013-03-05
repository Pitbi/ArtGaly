var Book 			= require("../models/book");
var async   		= require("async");
var saveUploadedPdf = require("../services/uploadPdf");


var BooksController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

BooksController.prototype.GET = function () {
  var self = this;
  var book = new Book();
  Book.find(function (err, books) {
  	if (err) throw err;

  	self.res.render('books/index', {books: books, book: book});
  });
};

BooksController.prototype.POST = function() {
	var self = this;
	var book = new Book();
	if (self.req.files.books[1]) {
	    async.forEachSeries(self.req.files.books, function (uploadedPicture, callback) {
			saveUploadedPdf(uploadedPicture, function(err) {
				if (err) return callback(err);

				callback();
			});
		}, function (err) {
			if (err) return callback(err);

			self.res.redirect("/books");
		});
	} else {
		saveUploadedPdf(self.req.files.books, function(err) {
			if (err) throw err;

			self.res.redirect("/books");
		});
	}
}

module.exports = BooksController;
