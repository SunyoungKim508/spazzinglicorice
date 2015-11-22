angular.module('devslate.user', [])

.controller('UserCtrl', function ($scope, $location, User, BoardDB) {
// Set toolbar for colour palette and eraser. 
  $scope.todos = [];
  $scope.bookmarks = [];

  $scope.bookmark = function (url) {
    $location.path(url);
  }

  // TODO
  $scope.createBoard = function (name) {
    console.log('createBoard');
    BoardDB.createBoard(name)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    // $location.path('/new');
  };

  console.log('user', User);
  $scope.getTodos = function () {
    User.getTodos()
      .then(function (todos) {
        $scope.todos = todos;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.getBookmarks = function () {
    User.getBookmarks()
      .then(function (bookmarks) {
        $scope.bookmarks = bookmarks;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.getTodos();
  $scope.getBookmarks();

  $scope.getBookmark = function (url) {
    User.getBookmark(url)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
});
