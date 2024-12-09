const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); 

const JWT_SECRET = process.env.JWT_SECRET;

const authorizeAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId); 

    if (!admin) {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }

    req.admin = admin;

    next(); 
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authorizeAdmin;
