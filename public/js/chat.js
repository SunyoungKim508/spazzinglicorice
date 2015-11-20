angular.module('whiteboard.chat', [])
// Set toolbar for colour palette and eraser. 
.controller('ChatCtrl', function($scope, $element) {
  var ioRoom = window.location.href;
  // all messages from users will be stored in texts array
  $scope.texts = [];

  // using io instance(socket) by calling it ioRoom(namespace)
  var socket = io(ioRoom);
  $scope.sendMessage = function (message, $event) {
    $event.preventDefault();
    socket.emit('chat message', message);
    $scope.message = '';
    return false;
  }

  socket.on('chat message', function (msg) {
    console.log('are you?');
    console.log(msg);
    $scope.texts.push(msg);
  });
})

// Set changePen method.
// Note that an eraser is simply a white pen, not actually erasing [x,y] tuples from the database. 
.service('tools', function($rootScope) {
  var changePen = function(option) {
    console.log($rootScope.app.pen);
    if (option === 'eraser') {
      console.log("The user is using the eraser.");
      $rootScope.app.pen.lineWidth = 50;
      $rootScope.app.pen.strokeStyle = '#fff';
    } else {
      console.log("The user is using the pen.");
      $rootScope.app.pen.lineWidth = 5;
      $rootScope.app.pen.strokeStyle = option;
    }
  };
  return {
    changePen: changePen
  };

});
