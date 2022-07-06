const error = (err, _req, res, next) => {
 // const { status, message } = err;
  // if (err.name === 'ValidationError') {

  // }
  if (err.name === 'NotFoundError') {
    res.status(404).json({ message: err.message });
  }
  next();
};

module.exports = error;
