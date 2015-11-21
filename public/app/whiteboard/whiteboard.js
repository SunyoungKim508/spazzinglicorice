angular.module('devslate.whiteboard', [])

.controller('WhiteboardCtrl', function ($scope, Board, Socket) {
  var boardObj;

  Board.newBoard()
  .then(function (namespace) {
    Socket.setSocket(namespace);
  });

  $scope.initBoard = function () {
    var canvasElement = angular.element('#whiteboard');
    console.log('canvaselement: ', canvasElement);

    var webrtcElements = {
      local: angular.element('#localVideo'),
      remote: angular.element('#remoteVideos')
    };
    console.log('before returning Board.initialize');
    boardObj = Board.initialize(canvasElement, webrtcElements);
  };
  $scope.initBoard();

  console.log('boardObj: ', boardObj);

  $('#localVideo').draggable();
  $('#remoteVideos').draggable();

  console.log('board: ', Board);

  boardObj.canvas.on('mousedown', function (e) {

    if (!Board.otherUserActive) {
      console.log('User has started to draw.');

      //initialize mouse position.
      boardObj.mouse.click = true;
      boardObj.mouse.x = e.offsetX;
      boardObj.mouse.y = e.offsetY;

      boardObj.initializeMouseDown(boardObj.pen, boardObj.mouse.x, boardObj.mouse.y);

      //Emit the pen object through socket
      Socket.socket.emit('start', boardObj.pen);

      //Add the first mouse coordinates to the stroke array for storage
      Board.stroke.push([boardObj.mouse.x, boardObj.mouse.y]);
    } else {
      console.log('Another user is drawing - please wait.');
    }
  });

  boardObj.canvas.on('drag', function (e) {

    if (!Board.otherUserActive) {
      if (boardObj.mouse.click) {
        boardObj.mouse.drag = true;

        //Find x,y coordinates of the mouse dragging on the canvas.
        var x = e.offsetX;
        var y = e.offsetY;

        //render the drawing
        boardObj.draw(x, y);
        console.log("currently drawing coordinates", [x, y]);

        //continue to push coordinates to stroke array (as part of storage)
        Board.stroke.push([x, y]);

        Socket.socket.emit('drag', [x, y]);
      }
    } else {
      console.log('Another use is drawing - please wait');
    }
  });

  //On mouse dragend detection, tell socket that we have finished drawing
  boardObj.canvas.on('dragend', function (e) {
    if (!Board.otherUserActive) {
      boardObj.mouse.drag = false;
      boardObj.mouse.click = false;

      console.log('Drawing is finished and its data is being pushed to the server', [Board.stroke, boardObj.pen]);

      //Empty the stroke array.
      Board.stroke = [];

      //Tell socket that we've finished sending data
      Socket.socket.emit('end', null);

    } else {
      console.log('Another user is drawing - please wait');
    }
  });

  boardObj.canvas.on('mouseleave', function (e) {
    boardObj.canvas.trigger('dragend');
  });


});
