const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  
    try {
      const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (!updatedPost) {
        res.status(404).json({ message: 'No post found with this specific id.' });
        return;
      }
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deletedPost = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deletedPost) {
        res.status(404).json({ message: 'No post found with this specific id.' });
        return;
      }
  
      res.status(200).json(deletedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;