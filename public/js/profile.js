angular.module('whiteboard.profile', [])
// Set toolbar for colour palette and eraser. 
.controller('ProfileCtrl', function($scope, $location, User) {
  // TODO
  $scope.createBoard = function (name) {
    $location.path('/new');
  }

  $scope.getTodos = function () {
    User.getTodos()
      .then(function (todos) {
        console.log('hi?');
        $scope.todos = todos;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  $scope.getBookmarks = function () {
    User.getBookmarks()
      .then(function (bookmarks) {
        console.log(bookmarks);
        $scope.bookmarks = bookmarks;
      })
      .catch(function (err) {
        console.log(err);
      });    
  }

  $scope.getTodos();
  $scope.getBookmarks();

  $scope.gotoBookmark = function (url) {
    $location.path('/'+url);
  }
});
