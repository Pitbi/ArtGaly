var requireUser = function (req, res, callback) {
  if (!req.user) {
    res.status(401);
    res.end("Vous n'etes pas connecte en mode administrateur.");
  } else {
    callback();
  }
}

module.exports = requireUser;