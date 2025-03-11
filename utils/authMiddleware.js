const jwt = require('jsonwebtoken');
exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
  next();
};