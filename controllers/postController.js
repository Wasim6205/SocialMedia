const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { content } = req.body;
    try {
        const newPost = new Post({
            user: req.user.id,
            content
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['username']);
        res.status(200).json({success:true, data:posts, msg: "post fetched successfully"});
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(id, { content }, { new: true });
        res.status(201).json({data: post, msg: "post updated successfully"});
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndDelete({_id:id});
        res.status(200).json({ msg: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.likePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (post.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.commentPost = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const post = await Post.findById(id);
        post.comments.unshift({
            user: req.user.id,
            text
        });
        await post.save();
        res.json(post.comments);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
