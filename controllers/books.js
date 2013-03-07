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
  if (self.req.files.books) {
  	saveUploadedPdf(self.req.files.books, self.req.body.book, function(err) {
  		if (err &! err.errors) throw(err);

      if (err) {
        var errors = err.errors;
        Book.find(function (err, books) {
          if (err) throw err;

          book.errors = errors;
          self.res.render('books/index', {books: books, book: book});
        });
      } else {
  		  self.res.redirect("/books");
      }
  	});
  } else {
    res.redirect('back');
  }
}

module.exports = BooksController;
