
var BooksController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

BooksController.prototype.GET = function () {
  var self = this
  self.res.render('books/index');
};

module.exports = BooksController;
