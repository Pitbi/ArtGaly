var Picture     = require("../models/picture");
var Album       = require("../models/album");

var CommentsController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

CommentsController.prototype.DELETE = function () {
  var self = this;
  Picture.findById(self.req.body.comment.picture, function (err, picture) {
    if (err) throw err;

    picture.comments.forEach(function (comment) {
      if (comment.id == self.req.body.comment.id) {
        comment.remove();
      }
    });
    picture.save(function (err) { 
      if (err) throw err;

      self.res.redirect("/picture/" + picture.id);
    });
  });  
}

CommentsController.prototype.POST = function () {
  var self = this;
  var comment = self.req.body.comment;
  Picture.findById(self.req.body.comment.picture, function (err, picture) {
    if (err) throw err;
    picture.comments.push(comment);
    picture.save(function (err) {
      if (err &! picture.errors) throw err;

      if (err) {
        var errors = picture.errors;
        Picture.findById(picture.id).populate("album").exec(function (err, picture) {
          if (err)
            throw err;
          
          picture.errors = errors;
          Album.findById(picture.album.id).populate("pictures").exec(function (err, album) {    
          if (err)
            throw err;
            
            console.log(picture.errors);
            self.res.render("pictures/show", {picture: picture, album:album});
          });  
        });
      } else {
        console.log(":)");
        self.res.redirect("/picture/" +  picture.id);
      }
    });
  });
};

module.exports = CommentsController;
