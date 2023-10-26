function isLogin(req, res, next) {
  if (!req.session.userId) {
    let errMsg = "Please Login First!";
    res.redirect(`/?errMsg=${errMsg}`);
  } else {
    next();
  }
}

module.exports = {isLogin}