// # Socket Connection Handler

// ##### [Back to Table of Contents](./tableofcontents.html)

// Import board model from [board.js](../documentation/board.html)
var Board = require('../db/board');

// **boardUrl:** *String* <br>
// **board:** *Mongoose board model* <br>
// **io:** *Export of our Socket.io connection from [server.js](../documentation/server.html)*
var connect = function(boardUrl, board, io) {

  // Set the Socket.io namespace to the boardUrl.
  var whiteboard = io.of(boardUrl);

  whiteboard.once('connection', function(socket) {
  //require our separate modules - drawing, chat, etc...
  require('./drawing.js')(socket);

    // Send the current state of the board to the client immediately on joining.
    socket.emit('join', board);


  });
};

// Required by [server.js](../documentation/server.html)
module.exports = connect;
