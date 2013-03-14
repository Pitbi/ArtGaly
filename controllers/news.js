var News        = require("../models/news");
var requireUser = require ("../services/requireUser");

var NewsController = function(req, res, next) {
  this.req = req;
  this.res = res;
  return this;
};


NewsController.prototype.GET = function () {
  var self = this;
  News.find().sort({date: -1}).exec(function (err, news) {
    if (err) throw err;
    
    self.res.render("news/index", {news: news});
  });
};

NewsController.prototype.POST = function () {
  var self = this;
  
  requireUser(self.req, self.res, function () {
    var news = new News(self.req.body.news);
    news.save(function (err) {
      if (err) throw err;
      
      self.res.redirect("/news");
    });
  });
};

module.exports = NewsController;
