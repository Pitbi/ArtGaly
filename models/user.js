var mongoose = require("mongoose");


var Schema   = mongoose.Schema;
var userSchema = new Schema ({
	username     	  : String,
	password 	      : String
});


userSchema.methods.validPassword = function (password) {
  if (this.password == password) {
    return true;
  }
  return false;
};

var User = mongoose.model("User", userSchema);


module.exports = User;