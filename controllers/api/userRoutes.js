const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({ 
      ...req.body,
      user_id: req.session.user.id
    });
      res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/l:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update({
       where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
      ...req.body,
      user_id: req.session.user_id
    });
      res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/l:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!'});
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      body: req.body.newComment,
      post_id: req.params.id,
      user_id: req.session.user_id
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;