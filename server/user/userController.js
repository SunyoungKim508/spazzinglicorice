// userController.js
var User = require('../../db/user.js');
var Q = require('q');
module.exports = {
  getTodos: function (req, res) {
    var findTodos = Q.nbind(User.findOne, User);
    console.log('server:getTodos');
    findTodos({firstName: 'Sunyoung'})
      .then(function (user) {
        res.json(user.todos);
      })
      .fail(function (error) {
        next(error);
      });
  },

  // need user to add todo
  // user from the session
  addTodo: function (req, res) {
    var findUser = Q.nbind(User.findOne, User);
    var todo = req.body.todo;
    findUser({firstName: "Sunyoung"})
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

  getBookmarks: function (req, res) {
    var findBookmarks = Q.nbind(User.findOne, User);
    console.log('server:getBookmarks');
    findBookmarks({firstName: 'Sunyoung'})
      .then(function (user) {
        res.json(user.bookmarks);
      })
      .fail(function (error) {
        next(error);
      });
  },

  getBookmark: function (req, res) {
    var url = req.params.url;
    res.redirect('/' + url);
  },

  addBookmark: function (req, res) {
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
  },
  getUser: function () {
  }
}
