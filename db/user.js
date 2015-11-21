var mongoose = require('mongoose');
var db = require('./config');

var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
  // url of the board
  url: String,
  name: String
});

// var todoSchema = new Schema({
//   todo: String
// });

var userSchema = new Schema({
  facebookId: String,
  token: String,
  firstName: String,
  lastName: String,
  email: String,
  bookmarks: [bookmarkSchema],
  todos: Array
});

var User = mongoose.model('user', userSchema);

// Required by [Server](../documentation/server.html) & [Socket Connection Handler](../documentation/sockets.html)
module.exports = User;
