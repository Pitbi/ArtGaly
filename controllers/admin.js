var Album 		= require("../models/album");
var Picture 	= require("../models/picture");
var requireUser = require("../services/requireUser");

var AdminController = function(req, res, next) {
  this.req = req;
  this.res = res;
  return this;
};

AdminController.prototype.GET = function () {
	var self = this;
	requireUser(self.req, self.res, function() {
	  Album.find().populate("cover").exec(function (err, albums) {
	    Picture.find().exec(function (err, pictures) {
	      self.res.render("admin/index", {albums: albums, pictures: pictures});
	    });
	  });
	});
};


module.exports = AdminController;
