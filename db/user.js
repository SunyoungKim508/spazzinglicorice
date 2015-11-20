var mongoose = require('mongoose');
var db = require('./config');

var bookmarkSchema = new mongoose.Schema({
  // url of the board
  url: String
});

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  facebookId: String,
  token: String,
  firstName: String,
  lastName: String,
  email: String,
  bookmarks: [bookmarkSchema]
});

var User = mongoose.model('user', userSchema);

// Required by [Server](../documentation/server.html) & [Socket Connection Handler](../documentation/sockets.html)
module.exports = User;
