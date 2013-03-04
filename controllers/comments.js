var Picture = require('../models/picture');

var CommentsController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

CommentsController.prototype.POST = function () {
  var self = this;
  console.log(self.req.body);
  var comment = self.req.body.comment;
  Picture.findById(self.req.body.comment.picture, function (err, picture) {
    picture.comments.push(comment);
    picture.save(function (err) {
      if (err) throw err;

      self.res.redirect('back');
    });
  });
};

module.exports = CommentsController;
