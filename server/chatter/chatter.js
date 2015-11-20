// io => whiteboard = io.of(boardUrl);
var chatting = function (socket, Board, io) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
}

module.exports = chatting;
