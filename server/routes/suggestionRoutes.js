const passport = require("passport");
const express  = require('express');
const router   = express.Router();

//Models
const Suggestion = require('../models/Suggestion');

// @route   GET api/suggestions
// @desc    Get All Suggestions
// @access  Public
router.get("/", (req, res) => {
  const page   = parseInt(req.query.page)   || 1;
  const amount = parseInt(req.query.amount) || 6;

  Suggestion.findSuggestion(null, page, amount, (err, suggestions) => {
    err ? res.status(500).send(err) : res.json(suggestions)
  });
});

// @route   GET api/suggestions/length
// @desc    Get Number of Suggestions
// @access  Public
router.get("/length", (req, res) => { 
  Suggestion.countSuggestions((err, numberOfSuggestions) => {
    err ? res.status(500).send(err) : res.json(numberOfSuggestions)
  });
});

// @route   GET api/suggestions/:id
// @desc    Show A Suggestion 
// @access  Public
router.get('/:id', (req, res) => {
  Suggestion.findSuggestion({_id: req.params.id}, 1, 1, (err, suggestion) => {
    err ? res.json({success: false, msg: "suggestion not found"}) : res.json(suggestion)
  }); 
});

// @route   POST api/suggestions
// @desc    Create A Suggestion
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
  const newSuggestion = new Suggestion({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  });
  
  Suggestion.addSuggestion(newSuggestion, (err, suggestions) => {
    err ? res.status(500).send(err) : res.json(suggestions)
  });
});

// @route   PUT api/suggestions/:id
// @desc    Update A Suggestion
// @access  Private
router.put('/:id', passport.authenticate('jwt', {session:false}), (req, res) => { 
  const updatedSuggestion = {
    title: req.body.title,
    description: req.body.description,

    score: req.body.score,
    likes: req.body.likes,
    dislikes: req.body.dislikes
 }; 

  Suggestion.updateSuggestion({_id: req.params.id}, updatedSuggestion, (err, suggestions) => {
    err ? res.status(404).send(err) : res.json(suggestions)
  });
});

// @route   DELETE api/suggestions/:id
// @desc    Delete A Suggestion
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Suggestion.deleteSuggestion(req.params.id, err => {
    err ? res.status(404).send(err) : res.json({sucess:true, msg:'Suggestion Deleted'});
  });
});

module.exports = router;