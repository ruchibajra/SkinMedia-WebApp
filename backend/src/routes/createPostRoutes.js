const express = require("express");
const router = express.Router();
const { postImage } = require("../middleware/uploadMiddleware");
const {createPost, updatePost, deletePost, getPosts, getPost} = require ('../controllers/createPostController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');

router.post('/', postImage.single('productImage'), createPost);
router.patch('/update/:id', postImage.single('productImage'), updatePost);
router.delete('/delete/:id', deletePost);
router.get('/', getPosts);
router.get('/:id', getPost);




module.exports = router;
