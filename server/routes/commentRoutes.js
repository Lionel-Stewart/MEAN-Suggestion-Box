const passport = require("passport");
const express  = require('express');
const router   = express.Router();

//Models
const Comment = require('../models/Comment');

// @route   GET api/comments
// @desc    Get All Comments
// @access  Public
router.get("/", (req, res) => {
  const page   = parseInt(req.query.page)   || 1;
  const amount = parseInt(req.query.amount) || 5;

  const parentId = req.query.parentId;

  Comment.findComment({parentId: parentId}, page, amount, (err, comments) => {
    err ? res.status(500).send(err) : res.json(comments)
  });
});

// @route   GET api/comments/length
// @desc    Get Number of Comments
// @access  Public
router.get("/length", (req, res) => { 
  const parentId = req.query.parentId;
  Comment.countComments({parentId: parentId}, (err, numberOfComments) => {
    err ? res.status(500).send(err) : res.json(numberOfComments)
  });
});

// @route   POST api/comments
// @desc    Create A Comment
// @access  Public
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const newComment = new Comment({
    author: req.body.author,
    content: req.body.content,
    parentId: req.body.parentId
  });
  
  Comment.addComment(newComment, (err, comments) => {
    err ? res.status(500).send(err) : res.json(comments)
  });
});


// @route   PUT api/comments/:id
// @desc    Update A Comment
// @access  Public
router.put('/:id', passport.authenticate('jwt', {session:false}), (req, res) => { 
  const updatedComment = {
    content: req.body.content,
    
    score: req.body.score,
    likes: req.body.likes,
    dislikes: req.body.dislikes
  };

  Comment.updateComment({_id: req.params.id}, updatedComment, (err, comments) => {
    err ? res.status(404).send(err) : res.json(comments)
  });
});

// @route   DELETE api/comments/:id
// @desc    Delete A Comment
// @access  Public
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Comment.deleteComment(req.params.id, err => {
    err ? res.status(404).send(err) : res.json({sucess:true, msg:'Comment Deleted'});
  });
});

module.exports = router;