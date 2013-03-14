var LogoutController = function(req, res, next) {
  this.res = res;
  this.req = req;
  return this;
};

LogoutController.prototype.GET = function () {
  console.log(":p");
  this.req.logOut();
  this.res.redirect("/");
};

module.exports = LogoutController;