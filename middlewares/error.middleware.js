const error = (err, _req, res, next) => {
  const { status, message } = err;
  if (err) {
    res.status(status).json({ message });
  }
  next();
};

module.exports = error;
