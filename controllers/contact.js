var Contact = require("../models/contact");
var config 		= require('../config/config');

var ContactController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

ContactController.prototype.GET = function () {
  var contact = new Contact();
  this.res.render("contact/show", {contact: contact});
};

ContactController.prototype.POST = function () {
  var self = this;
  var contact = new Contact(self.req.body.contact);

  contact.save(function (err) {
  	if (err &! contact.errors) throw err;

    if (err) {
      self.res.render("contact/show", {contact: contact});
    } else {
    	contact.sendContactByMail(config.smtp, function (err) {
    		if (err) throw err;

    		self.res.redirect("/");
    	});
    }
  });
};

ContactController.prototype.DELETE = function () {
  var self = this;
  Contact.findByIdAndRemove(self.req.body.contact.id, function (err) {
    if (err) throw err;

    self.res.redirect("/admin");
  });
};

module.exports = ContactController;