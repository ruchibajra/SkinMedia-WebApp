const express = require('express');
const { registerUser, loginUser, disableUser, getAllUsers, enableUser } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/disable/:userId', authMiddleware, authorizeRole("admin"), disableUser);
router.put('/enable/:userId', authMiddleware, authorizeRole("admin"), enableUser);
router.get('/all', authMiddleware, authorizeRole("admin"), getAllUsers);
module.exports = router;
