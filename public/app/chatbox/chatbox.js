angular.module('devslate.chatbox', [])
// TODO: use socket from service
.controller('ChatboxCtrl', function ($scope, User, Socket, Authenticate) {

  $scope.texts = [];
  $scope.list = '';
  $scope.message = '';
  var username = Authenticate.user().firstName;
  console.log('username in chatbox: ', username);

  //add socket listener once socket is initialized
  $scope.$on('socket-init', function (event, args) {
    Socket.on('chat-message', function (msg) {
      console.log('heard chat-message client side');
      $scope.texts.push(msg);
      // $scope.$apply();
    });
  });
  // all messages from users will be stored in texts array

  // using io instance(socket) by calling it ioRoom(namespace)
  $scope.sendMessage = function (message, $event) {
    $event.preventDefault();
    var text = {user: username, message: message};
    console.log(text);
    $scope.texts.push(text);
    // $scope.$apply();
    Socket.emit('chat-message', text);
    $scope.message = '';
    // console.log(Authenticate.user());
  };

  $scope.addTodo = function (list, $event) {
    $event.preventDefault();
    User.addTodo(list)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    $scope.list = '';
  };

});
