// userController.js
var User = require('../../db/user.js');
var Q = require('q');

module.exports = {
  getTodos: function () {
    var findAll = Q.nbind(Link.find, Link);

    findAll({})
      .then(function (todos) {
        res.json(todos);
      })
      .fail(function (error) {
        next(error);
      });
  },

  // need user to add todo
  addTodo: function (todo) {
    
  },

  getBookmarks: function () {
    var findAll = Q.nbind(Link.find, Link);

    findAll({})
      .then(function (bookmarks) {
        res.json(bookmarks);
      })
      .fail(function (error) {
        next(error);
      });
  },

  addBookmark: function (bookmark) {

  },

  getUser: function () {

  }
}
