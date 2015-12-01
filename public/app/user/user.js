angular.module('devslate.user', [])

.controller('UserCtrl', function ($scope, $state, $location, Board, User, $http, $rootScope, Authenticate) {
// Set toolbar for colour palette and eraser. 
  $scope.todos = [];
  $scope.bookmarks = [];
  $scope.profPicUrl = 'http://s3.amazonaws.com/readers/2011/10/29/penguin--openclipart--by-maw_2.png';

  $scope.getUser = function (url) {
    var facebookId = Authenticate.user().facebookId;
    $scope.user = Authenticate.user();
    $http({
      method: 'GET',
      url:'https://graph.facebook.com/'+facebookId+'/picture?redirect=false&type=large'
    }).then(function (data) {
      console.log('data inside get user: ', data);
      $scope.profPicUrl = data.data.data.url;
    })
  };
  $scope.getUser();

  $scope.bookmark = function (url) {
    $location.path(url);
  };

  // go to the board
  // id: url of bookmark
  $scope.connectBoard = function (id) {
    // connect proper socket
    Board.connectBoard(id);
    // set id to currentBoard in root scope
    $rootScope.currentBoard = id;
    // go to board
    $state.go('board');
  }

  // TODO
  $scope.createBoard = function (name) {
    console.log('Create Board');
    $scope.newBoard = '';
    Board.createBoard(name)
      .then(function (bookmarks) {
        $scope.bookmarks = bookmarks.data;
      });
  };

  $scope.getTodos = function () {
    User.getTodos()
      .then(function (todos) {
        console.log('',todos);
        $scope.todos = todos;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.addTodo = function (todo) {
    console.log('todo ', todo,' has been added');
    User.addTodo(todo)
      .then(function (response) {
        // clear input box
        $scope.todo = "";
        // update todos
        $scope.todos = response.data;
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

  $scope.addBookmarks = function (bookmark) {
    User.addBookmarks(bookmark)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      })
      .then(function (res) {
        $scope.getBookmarks();
        console.log($scope.bookmarks);
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
  };
});
