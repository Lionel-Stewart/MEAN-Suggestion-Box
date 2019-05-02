const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: String, required: true},
  content: { type: String, required: true },
  parentId: { type: String, required: true },
  
  score: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  created: { type: Date, default: new Date() }, 
  dislikes: { type: Number, default: 0 },
  displayDate: { type: String, default: new Date() }
});

const Comment = module.exports = mongoose.model('Comment', commentSchema);

module.exports.findComment = (command, page, amount, callback) => {
  Comment.find(command, callback) 
    .skip((page-1)*amount)
    .limit(amount)
    .sort({score: -1, likes: -1})
}

module.exports.countComments = (command, callback) => {
  Comment.countDocuments(command, callback) 
}

module.exports.addComment = (newComment, callback) => {
  newComment.save(callback);
}

module.exports.updateComment = (id, updatedComment, callback) => {
  Comment.updateOne(id, updatedComment, callback) 
}

module.exports.deleteComment = (id, callback) => {
  Comment.findById(id, callback)
    .then(blog => blog.remove())
}