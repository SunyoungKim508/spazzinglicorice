// io => whiteboard = io.of(boardUrl);
var chatting = function (socket, whiteboard) {
  console.log('socketchatter');
  socket.on('chat message', function (msg) {
    console.log('chatter' + msg);
    whiteboard.emit('chat message', msg);
  });
}

module.exports = chatting;
