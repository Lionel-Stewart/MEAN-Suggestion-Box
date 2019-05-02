const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const suggestionSchema = new Schema({ 
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },

  score: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  created: { type: Date, default: new Date() },
  dislikes: { type: Number, default: 0 },
  displayDate: { type: String, default: new Date() }
});

const Suggestion = module.exports = mongoose.model('Suggestion', suggestionSchema);

module.exports.findSuggestion = (command, page, amount, callback) => {
  Suggestion.find(command, callback) 
    .skip((page-1)*amount)
    .limit(amount)
    .sort({score: -1, likes: -1})
}

module.exports.countSuggestions = (command, callback) => {
  Suggestion.countDocuments(command, callback) 
}

module.exports.addSuggestion = (newSuggestion, callback) => {
  newSuggestion.save(callback);
}

module.exports.updateSuggestion = (id, updatedSuggestion, callback) => {
  Suggestion.updateOne(id, updatedSuggestion, callback) 
}

module.exports.deleteSuggestion = (id, callback) => {
  Suggestion.findById(id, callback)
    .then(suggestion => suggestion.remove())
}