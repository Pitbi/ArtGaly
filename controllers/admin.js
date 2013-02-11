var Album = require('../models/album');

var AdminController = {}

AdminController.index = function (req, res) {
  Album.find().exec(function (err, albums) {
    res.render('admin/index', {albums: albums});
  });
};


module.exports = AdminController;
