angular.module('whiteboard.services', [])
.factory('Chat', function($scope, $element, tools) {
  // var sendMessages = function () {

  // };
  // return {
  //   sendMessages: sendMessages
  // }
})
.factory('Board', function () {

  var createBoard = function (name) {
    return $http({
      method: 'POST',
      data: name,
      url: 'http://localhost:8080/api/board'
    });
  };

  return {
    createBoard: createBoard
  }
})
.factory('User', function () {
  var getUser = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/user'
    }).then(function (res) {
      // user object
      return res.data;
    });
  };

  var getTodos = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/user/todo'
    }).then(function (res) {
      // return todos list(Array)
      return res.data;
    });
  };

  var addTodo = function (todo) {
    return $http({
      method: 'POST',
      data: todo,
      url: 'http://localhost:8080/api/user/todo'
    });
  };

  var getBookmarks = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/user/bookmark'
    }).then(function (res) {
      // return bookmarks list(Array)
      return res.data;
    });
  };

  var addBookmark = function (bookmark) {
    return $http({
      method: 'POST',
      data: bookmark,
      url: 'http://localhost:8080/api/user/bookmark'
    });
  };


  var getAllUser = function () {

  };

  return {
    addTodo: addTodo,
    getTodo: getTodos,
    addBookmark: addBookmark,
    getBookmarks: getBookmarks
  }
})

