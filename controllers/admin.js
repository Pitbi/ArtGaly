var Album 		= require("../models/album");
var Picture 	= require("../models/picture");
var Contact 	= require("../models/contact");
var Home 			= require("../models/home");
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
	  	if (err) throw err;

	  	Home.findOne(function (err, home) {
	  		if (err) throw err;

		    Picture.find().exec(function (err, pictures) {
		    	if (err) throw err;

		    	Contact.find().sort({"date": -1}).exec(function (err, contacts) {
		    		if (err) throw err;
		    		
		      	self.res.render("admin/index", {albums: albums, pictures: pictures, home: home, contacts: contacts});
		      });
		    });
		  });
	  });
	});
};


module.exports = AdminController;
