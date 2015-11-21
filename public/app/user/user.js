angular.module('devslate.user', [])

.controller('UserCtrl', function ($scope, $location, User, Board) {
  $scope.createBoard = function (name) {
    console.log('createBoard');
    Board.createBoard(name)
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
    // $location.path('/'+url);
  };
});
