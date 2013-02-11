var HomeController = function(req, res, next) {
  this.res = res;
  return this;
};

HomeController.prototype.GET = function () {
  console.log("HomeController");
  this.res.render('home/show');
};

module.exports = HomeController;
