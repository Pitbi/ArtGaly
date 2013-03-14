var mongoose = require("mongoose");

var Schema   = mongoose.Schema;
var homeSchema = new Schema ({
	text1     			: String,
	lastPicturesView 	: Boolean,
	caroussel			: Boolean
});

var Home = mongoose.model("Home", homeSchema);

module.exports = Home;


Home.findOrCreate = function findOrCreate(callback) {
  Home.find(function (err, home) {
  	if (err) return callback(err);

  	if (home.length == 0) {
  		var home = new Home();
  		home.save(callback);
  	} else {
  		callback(null, home[0]);
  	}
  });
};
