var Picture 	= require("../models/picture");
var config 		= require('../config/config')

var OfferController = function(req, res, next) {
  this.req = req;
  this.res = res;
  return this;
};

OfferController.prototype.POST = function () {
	var self = this;
	var offer = self.req.body.offer;
	console.log(":)", offer);
	Picture.findById(offer.picture, function (err, picture) {
		if (err) throw err;

		picture.offers.push(offer);
		picture.save(function (err) {
			if (err &! picture.errors) throw err;

			if (err) {
				console.log("ERROROROROR");
			} else {
				picture.sendOfferByMail(config.smtp, offer, function (err) {
					if (err) throw err;

					self.res.redirect("/");
				});
			}
		})
	});
};


module.exports = OfferController;
