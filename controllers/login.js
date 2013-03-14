var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require("../models/user");

passport.use(new LocalStrategy(
	function(username, password, done) {
	  User.findOne({username: username}, function (err, user) {
	    if (err) { return done(err); }
	    if (!user) {
	      return done(null, false, { message: 'Incorrect username.' });
	    }
	    if (!user.validPassword(password)) {
	      return done(null, false, { message: 'Incorrect password.' });
	    }
	    console.log("IN USER", user);
	    return done(null, user);
	  });
	}
));

passport.serializeUser(function(user, done) {
  console.log("Serialll");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("bliiiii", id);
  User.findById(id).exec(function (err, member) {
    done(err, member);
  });
});

var LoginController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

LoginController.prototype.GET = function () {
  var self = this;
  self.res.render("login/show");
};
/*
LoginController.prototype.POST = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});*/

module.exports = LoginController;