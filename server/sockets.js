// # Socket Connection Handler

// ##### [Back to Table of Contents](./tableofcontents.html)

// Import board model from [board.js](../documentation/board.html)
var Board = require('../db/board');
// var EventEmitter = require('events').EventEmitter;

// var emitter = new EventEmitter();
// emitter.setMaxListeners(0);
// **boardUrl:** *String* <br>
// **board:** *Mongoose board model* <br>
// **io:** *Export of our Socket.io connection from [server.js](../documentation/server.html)*
var connect = function(boardUrl, board, io) {

  // Set the Socket.io namespace to the boardUrl.
  var whiteboard = io.of(boardUrl);

  whiteboard.once('connection', function(socket) {
    //require our separate modules - drawing, chat, etc...
    console.log('work');
    require('./drawing/drawing.js')(socket, Board);
    socket.on('chat message', function (msg) {
      console.log('are you working?')
      console.log('chatter' + msg);
      whiteboard.emit('chat message', msg);
    });
    // require('./chatter/chatter.js')(socket, whiteboard);

    // Send the current state of the board to the client immediately on joining.
    socket.emit('join', board);
  });
};

// Required by [server.js](../documentation/server.html)
module.exports = connect;
