const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  // if token is not found then:
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // if token is found then:
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; /** req.user like a special database which can be access from anywhere of backend data file to obtain data */
    next(); /**next kam gara */
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

// next: decision lincha: guard le gate bhitra pathaucha and next kam gara vice versa
// bearer for security purpose added before but replace it later: works as cookies