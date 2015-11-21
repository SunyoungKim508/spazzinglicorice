angular.module('devslate.whiteboard', [])

.controller('WhiteboardCtrl', function ($scope, Board, Socket) {
  var boardObj;

  Board.newBoard()
  .then(function (namespace) {
    Socket.set(namespace);
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

  $('#localVideo').draggable();
  $('#remoteVideos').draggable();
})

.directive("drawing", function () {
  return {
    restrict: "A",
    link: function (scope, element) {
      var context = element[0].getContext('2d');

      var otherUserActive = false;
      var stroke = [];
      var prevPixel = [];

      var mouse = {
        click: false,
        drag: false,
        x: 0,
        y: 0
      };

      var pen = {
        fillStyle: 'solid',
        strokeStyle: 'black',
        lineWidth: 5,
        lineCap: 'round'
      };

      var draw = function (x, y) {
        context.lineTo(x, y);
        context.stroke();
      };

      var initializeMouseDown = function (pen, moveToX, moveToY) {
        // Copy over current pen properties (e.g. fillStyle).
        for (var key in pen) {
          context[key] = pen[key];
        }

        // Begin draw.
        context.beginPath();
        context.moveTo(moveToX, moveToY);
      };

      element.bind('mousedown', function (event) {
        if (!otherUserActive) {
          console.log("User has started to draw.");

          mouse.click = true;
          mouse.x = event.offsetX;
          mouse.y = event.offsetY;

          initializeMouseDown(pen, mouse.x, mouse.y);

          //Emit the pen object through socket
          Socket.emit('start', pen);

          //Add the first mouse coordinates to the stroke array for storage
          stroke.push([mouse.x, mouse.y]);
        } else {
          console.log('Another user is drawing - please wait.');
        }
      });

      element.bind('drag', function (event) {
        if (!otherUserActive) {
          if (mouse.click) {
            mouse.drag = true;

            //Find x,y coordinates of the mouse dragging on the canvas.
            var x = event.offsetX;
            var y = event.offsetY;

            //render the drawing
            draw(x, y);
            console.log('currently drawing coordinates', [x, y]);

            //continue to push coordinates to stroke array (as part of storage)
            stroke.push([x, y]);

            Socket.emit('drag', [x, y]);
          }
        } else {
          console.log('Another user is drawing- please wait');
        }
      });

      element.bind('dragend', function (event) {
        if (!otherUserActive) {
          mouse.drag = false;
          mouse.click = false;

          console.log('Drawing is finished and its data being pushed to server', [stroke, pen]);

          //Empty the stroke array.
          stroke = [];

          //Tell socket that we've finished sending data
          Socket.emit('end', null);
        } else {
          console.log("Another user is drawing - please wait");
        }
      });

      element.on('mouseleave', function (event) {
        element.trigger('dragend');
      });
    }
  };
});
