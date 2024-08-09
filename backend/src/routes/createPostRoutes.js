const express = require("express");
const router = express.Router();
const { postImage } = require("../middleware/uploadMiddleware");
const {createPost} = require ('../controllers/createPostController');

router.post('/', postImage.single('productImage'), createPost);

module.exports = router;
