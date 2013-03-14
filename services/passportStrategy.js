var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require("../models/user");

var passportLocalStrategy = function (username, password){
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	  	console.log(":D");
	    User.findOne({username: username}, function (err, user) {
	      if (err) { return done(err); }
	      if (!user) {
	        return done(null, false, { message: 'Incorrect username.' });
	      }
	      if (!user.validPassword(password)) {
	        return done(null, false, { message: 'Incorrect password.' });
	      }
	      return done(null, user);
	    });
	  }
	));
};

module.exports = passportLocalStrategy;