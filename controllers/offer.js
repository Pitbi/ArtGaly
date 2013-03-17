var Picture 	= require("../models/picture");
var Album     = require("../models/album");
var config 		= require('../config/config');

var OfferController = function(req, res, next) {
  this.req = req;
  this.res = res;
  return this;
};

OfferController.prototype.POST = function () {
	var self = this;
	var offer = self.req.body.offer;
	console.log(":)", offer);
	Picture.findById(offer.picture).populate("album").exec(function (err, picture) {
		if (err) throw err;

		picture.offers.push(offer);
		picture.save(function (err) {
			if (err &! picture.errors) throw err;

			if (err) {
    		Album.findById(picture.album.id).populate("pictures").exec(function (err, album) {    
    			if (err) throw err;
    
      		self.res.render("pictures/show", {picture: picture, album:album});  
  			});
			} else {
				picture.sendOfferByMail(config.smtp, offer, function (err) {
					if (err) throw err;

					self.res.redirect("/picture/" + picture.id);
				});
			}
		})
	});
};


module.exports = OfferController;
