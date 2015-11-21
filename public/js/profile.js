angular.module('whiteboard.profile', [])
// Set toolbar for colour palette and eraser. 
.controller('ProfileCtrl', function($scope, $rootScope, $location, User, Board) {
  $scope.todos = [];
  $scope.bookmarks = [];

  // TODO
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
  }

  console.log('user', User);
  $scope.getTodos = function () {
    User.getTodos()
      .then(function (todos) {
        $scope.todos = todos;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  $scope.getBookmarks = function () {
    User.getBookmarks()
      .then(function (bookmarks) {
        $scope.bookmarks = bookmarks;
      })
      .catch(function (err) {
        console.log(err);
      });    
  }

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
  }
});
