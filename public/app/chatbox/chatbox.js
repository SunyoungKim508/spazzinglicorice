angular.module('devslate.chatbox', [])
// TODO: use socket from service
.controller('ChatboxCtrl', function ($scope, User) {
  var ioRoom = window.location.href;
  // all messages from users will be stored in texts array
  $scope.texts = [];
  $scope.list = '';
  $scope.message = '';

  // using io instance(socket) by calling it ioRoom(namespace)
  var socket = io(ioRoom);
  $scope.sendMessage = function (message, $event) {
    $event.preventDefault();
    console.log(message);
    socket.emit('chat message', message);
    $scope.message = '';
    return false;
  }

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
    return false;
  }

  socket.on('chat message', function (msg) {
    console.log(msg);
    $scope.texts.push(msg);
    $scope.$apply();
  });  
});
