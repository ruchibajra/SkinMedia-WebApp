// when register, we create user profile at the same time

const express = require ('express');
const userProfileController = require('../controllers/userProfileController');
const router = express.Router();

router.post('/userProfile', userProfileController);

module.exports = router;

