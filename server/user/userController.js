// userController.js
var User = require('../../db/user.js');
var Q = require('q');

module.exports = {
  getTodos: function (req, res) {
    var findTodos = Q.nbind(User.findOne, User);
    var fbId = req.session.passport.user.facebookId;
    console.log('insde get todos!');
    console.log("USER", req.session.passport.user)
    console.log(req.session.passport.user.facebookId);
    findTodos({facebookId: fbId})
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
    console.log("inside add todo", req.session.passport.user);
    console.log("inside add todo, TODO is ", req.body.todo);
    var findUser = Q.nbind(User.findOne, User);
    var fbId = req.session.passport.user.facebookId;
    var todo = req.body.todo;

    findUser({facebookId: fbId})
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
    var fbId = req.session.passport.user.facebookId;
    findBookmarks({facebookId: fbId})
      .then(function (user) {
        res.json(user.bookmarks);
      })
      .fail(function (error) {
        next(error);
      });
  },

  getBookmark: function (req, res) {
    var url = req.params.url;
    console.log('working?');
    res.redirect('/' + url);
  },

  addBookmark: function (req, res) {
    var findUser = Q.nbind(User.findOne, User);
    var fbId = req.session.passport.user.facebookId;
    findUser({facebookId: fbId})
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
