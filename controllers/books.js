var Book 			      = require("../models/book");
var async   		    = require("async");
var saveUploadedPdf = require("../services/uploadPdf");
var requireUser     = require("../services/requireUser");


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
  requireUser(self.req, self.res, function () {
    if (self.req.files.books) {
    	saveUploadedPdf(self.req.files.books, self.req.body.book, function(err, book) {
    		if (err &! book.errors) throw(err);

        if (err) {
          Book.find(function (err, books) {
            if (err) throw err;

            self.res.render('books/index', {books: books, book: book});
          });
        } else {
    		  self.res.redirect("/books");
        }
    	});
    } else {
      res.redirect('back');
    }
  });
}

module.exports = BooksController;
