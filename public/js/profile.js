angular.module('whiteboard.profile', [])
// Set toolbar for colour palette and eraser. 
.controller('ProfileCtrl', function($scope, $location, User) {
  // TODO
  $scope.createBoard = function (name) {
    $location.path('/new');
  }

  User.getTodos()
    .then(function (todos) {
      $scope.todos = todos;
    })
    .catch(function (err) {
      console.log(err);
    });

  User.getBookmarks()
    .then(function (bookmarks) {
      $scope.bookmarks = bookmarks;
    })
    .catch(function (err) {
      console.log(err);
    });

  $scope.gotoBookmark = function (url) {
    $location.path('/'+url);
  }
});
