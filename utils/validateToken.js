const jwt = require('jsonwebtoken');

exports.VailidateToken = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};
