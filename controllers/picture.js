var mongoose        = require('mongoose');
var Album           = require('../models/album');
var Picture         = require('../models/picture');

var PicturesController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

PicturesController.prototype.GET = function () {
  var self = this

};

PicturesController.prototype.POST = function () {
  var self = this

};

module.exports = PicturesController;
