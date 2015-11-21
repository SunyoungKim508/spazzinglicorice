// userController.js
var User = require('../../db/user.js');
var Q = require('q');
var user = 'Sunyoung';
module.exports = {
  getTodos: function (req, res, user) {
    var findTodos = Q.nbind(User.findOne, User);

    findTodos({firstName: user})
      .then(function (user) {
        res.json(user.todos);
      })
      .fail(function (error) {
        next(error);
      });
  },

  // need user to add todo
  // user from the session
  addTodo: function (req, res, user, todo) {
    var findUser = Q.nbind(User.findOne, User);

    findUser({firstName: user})
      .then(function (user) {
        user.todos.push(todo);
        user.save(function (err, user) {
          res.json(todo);
        });
      })
      .fail(function (error) {
        next(error);
      });
  },

  getBookmarks: function (req, res, user) {
    var findBookmarks = Q.nbind(User.findOne, User);

    findBookmarks({firstName: user})
      .then(function (user) {
        res.json(user.bookmarks);
      })
      .fail(function (error) {
        next(error);
      });
  },

  addBookmark: function (req, res, bookmark) {
    var findUser = Q.nbind(User.findOne, User);

    findUser({firstName: user})
      .then(function (user) {
        user.bookmarks.push(bookmark);
        user.save(function (err, user) {
          res.json(bookmark);
        });
      })
      .fail(function (error) {
        next(error);
      });
  }
  ,
  getUser: function () {
  }
}
