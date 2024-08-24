const express = require("express");
const router = express.Router();
const { postImage } = require("../middleware/uploadMiddleware");
const {createPost, updatePost, deletePost, getPosts, getPost, addComment, getComments, deleteComment, likePost, unlikePost} = require ('../controllers/createPostController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');

router.post('/', postImage.single('productImage'), createPost);
router.patch('/update/:id', postImage.single('productImage'), updatePost);
router.delete('/delete/:id', deletePost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/comments', authMiddleware,  addComment);
router.get('/:postId/comments', getComments);
router.delete('/:postId/comments/:commentId', deleteComment);
router.patch('/:postId/like', authMiddleware, likePost);
router.patch('/unlike/:id', authMiddleware, unlikePost);









module.exports = router;