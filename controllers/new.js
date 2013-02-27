var News = require("../models/news");

var NewController = function(req, res, next) {
  this.req = req;
  this.res = res;
  return this;
};

module.exports = NewController;
