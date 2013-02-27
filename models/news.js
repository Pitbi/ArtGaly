var mongoose = require("mongoose");

var Schema   = mongoose.Schema;
var newsSchema = new Schema ({
  date     : {type: Date, default: Date.now},
  title    : String,
  elements : [String]
});

var News = mongoose.model("News", newsSchema);


module.exports = News;
