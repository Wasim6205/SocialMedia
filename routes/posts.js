const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, postController.createPost);
router.get('/', postController.getPosts);
router.put('/update/:id', authMiddleware, postController.updatePost);
router.delete('/delete/:id', postController.deletePost);
router.put('/like/:id', authMiddleware, postController.likePost);
router.post('/comment/:id', authMiddleware, postController.commentPost);

module.exports = router;
