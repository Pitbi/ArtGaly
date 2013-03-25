var mongoose = require("mongoose");
var email    = require("emailjs/email");

var Schema   = mongoose.Schema;
var contactSchema = new Schema ({
	sender    : {type: String, validate: [/^.{3,45}$/, "Votre nom doit contenir minimum 3 charactères et maximum 45."]},
	mail    	: {type: String, validate: [function(value) { return /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z0-9.\-_]{2,}.[a-zA-Z0-9.\-_]{2,}$/.test(value) }, "Svp, ajoutez une adresse mail correct (ex: john@example.com)"]},
	message   : {type: String, validate: [/^.{3,}$/, "Le message doit contenir minimum 3 charactères."]},
	date 			: {type: Date, default: Date.now}
});

contactSchema.methods.sendContactByMail = function(smtpConfig, callback) {
  var server  = email.server.connect({
    user: smtpConfig.user,
    password: smtpConfig.password,
    host: smtpConfig.host,
    ssl: true
  });
  server.send({
    text:    "Veuillez consultez la partie 'Admin' de votre site web pour visualiser le mail qui vous a été envoyé.",
    from:    smtpConfig.sender,
    to:      "pierre.biezemans@gmail.com",
    subject: "Envoie d'un mail sur votre site."
  }, callback);
};

var Contact = mongoose.model("Contact", contactSchema);



module.exports = Contact;
