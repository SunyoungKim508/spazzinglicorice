angular.module('devslate.chatbox', [])

.controller('ChatboxCtrl', function ($scope, Socket) {
  // var ioRoom = window.location.href;
  // all messages from users will be stored in texts array
  $scope.texts = [];
  // scope.watch

  // using io instance(socket) by calling it ioRoom(namespace)
  // var socket = io(ioRoom);
  $scope.sendMessage = function (message, $event) {
    $event.preventDefault();
    console.log('angular: '+ message);
    Socket.socket.emit('chat message', message);
    $scope.message = '';
    return false;
  };

  Socket.socket.on('chat message', function (msg) {
    console.log('socket'+ msg);
    $scope.texts.push(msg);
  });

  $scope.$watch('texts', function () {
    console.log('hi: texts');
  });
});
