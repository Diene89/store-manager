const error = (err, _req, res, next) => {
  console.log('meu erroooooo', err.message);
  switch (err.name) {
    case 'NotFoundError':
      res.status(404).json({ message: err.message });
      break;
    case 'ValidationError':
      if (err.message.includes('5')) {
        res.status(422).json({ message: err.message });
      } if (err.message === '"name" is required') {
        res.status(400).json({ message: err.message });
      }
      break;
    default: res.status(500).json({ message: err.message });
      break;
  }
  next();
};

module.exports = error;
