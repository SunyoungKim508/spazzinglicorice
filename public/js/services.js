angular.module('whiteboard.services', [])
.factory('Chat', function($scope, $element, tools) {
  // var sendMessages = function () {

  // };
  // return {
  //   sendMessages: sendMessages
  // }
})
.factory('Board', function ($http) {

  var createBoard = function (name) {
    return $http({
      method: 'POST',
      data: {name: name},
      url: 'http://localhost:8080/api/board'
    });
  };

  return {
    createBoard: createBoard
  }
})
.factory('User', function ($http) {
  // TODO: get username from session
  var getUser = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/user'
    }).then(function (res) {
      // user object
      return res.data;
    });
  };

  // TODO: get username from session
  var getTodos = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/user/todo'
    }).then(function (res) {
      // return todos list(Array)
      return res.data;
    });
  };

  // TODO: get username from session
  var addTodo = function (todo) {
    return $http({
      method: 'POST',
      // when you use POST method, you always should send json object
      data: {todo: todo},
      url: 'http://localhost:8080/api/user/todo'
    });
  };

  // TODO: get username from session
  var getBookmarks = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/user/bookmark'
    }).then(function (res) {
      // return bookmarks list(Array)
      console.log(res);
      return res.data;
    });
  };

  // TODO: get username from session
  var addBookmark = function (bookmark) {
    return $http({
      method: 'POST',
      data: bookmark,
      url: 'http://localhost:8080/api/user/bookmark'
    });
  };

  var getBookmark = function (bookmarkUrl) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/' + bookmarkUrl
    }).then(function (res) {
      // return bookmarks list(Array)
      console.log(res);
      return res.data;
    });
  };

  return {
    addTodo: addTodo,
    getTodos: getTodos,
    addBookmark: addBookmark,
    getBookmarks: getBookmarks,
    getUser: getUser,
    getBookmark: getBookmark
  }
})

