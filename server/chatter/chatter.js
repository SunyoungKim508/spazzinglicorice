// io => whiteboard = io.of(boardUrl);
var chatting = function (socket, whiteboard) {
  socket.on('chat message', function (msg) {
    whiteboard.emit('chat message', msg);
  });
}

module.exports = chatting;
