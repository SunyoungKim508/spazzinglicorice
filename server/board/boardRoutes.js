// boardRoutes.js
var boardController = require('./boardController.js');
// var handleSocket = require('../sockets.js');
// var path = require('path');

module.exports = function (router, Board, io) {
  // // router === userRouter injected from middlware.js
  // var socket = function(req, res, next) {
  //   Board.findById(req.params.url, function(err, board) {
  //     // If the board doesn't exist, or the route is invalid,
  //     // then redirect to the home page.
  //     if (err) {
  //       res.redirect('/');
  //     } else {
  //       // Invoke [request handler](../documentation/sockets.html) for a new socket connection
  //       // with board id as the Socket.io namespace.
  //       handleSocket(req.params.url, board, io);
  //       // Send back whiteboard html template.
  //       // console.log(path.join(__dirname, '../..', 'public/board.html'));
  //       res.sendFile(path.join(__dirname, '../..', 'public/board.html'));
  //     }
  //   });
  // };

  router
    .post('/', boardController.createBoard);

  // router.route('/:url')
  //   // .use(socket)
  //   .get(socket);
};
