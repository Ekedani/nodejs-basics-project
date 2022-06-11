module.exports = (req, res, next) => {
  if ((req.role = 'admin')) {
    next();
  } else {
    res.status(403).send();
  }
};
