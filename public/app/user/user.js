angular.module('devslate.user', [])

.controller('UserCtrl', function ($scope, $location, User, $http) {
// Set toolbar for colour palette and eraser. 
  $scope.todos = [];
  $scope.bookmarks = [];
  $scope.profPicUrl = 'http://s3.amazonaws.com/readers/2011/10/29/penguin--openclipart--by-maw_2.png';

  $scope.getUser = function (url) {
    // send get request with facebook ID to get user profile picture
    $http({
      method: 'GET',
      url:'https://graph.facebook.com/10208138228752958/picture?redirect=false&type=large'
    }).then(function (data) {
      console.log('data inside get user: ', data);
      $scope.profPicUrl = data.data.data.url;
    })
  };
  console.log("running get user");
  $scope.getUser();

  $scope.bookmark = function (url) {
    $location.path(url);
  };

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

  $scope.getTodos = function () {
    User.getTodos()
      .then(function (todos) {
        console.log(todos);
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
