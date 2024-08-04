const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require('../Middleware/authorizationMiddleware');
const {createCategory, updateCategory, getCategories, getCategory, deleteCategory} = require('../controllers/categoryController');



router.post('/create', authMiddleware, authorizeRole("admin"), createCategory);
router.patch('/update/:id', authMiddleware, authorizeRole('admin'), updateCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), deleteCategory);





module.exports = router;


// patch only some field update, patch says only this data updated
// put says all data udpated, and it can update all

