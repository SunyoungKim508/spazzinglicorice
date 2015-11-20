
var drawing = function(socket, Board) {

  socket.on('start', function(pen) {

    // **A stroke is essentially a continous line drawn by the user.**
    socket.stroke = {
      pen: pen,
      path: []
    };
  });

  socket.on('drag', function(coords) {
    //Push coordinates into the stroke's drawing path.
    socket.stroke.path.push(coords);
    // This payload will be sent back to all sockets *except the socket
    // that initiated the draw event.*
    var payload = {
      pen: socket.stroke.pen,
      coords: coords
    };

    //Broadcast new line coords to everyone but the person who drew it.
    socket.broadcast.emit('drag', payload);
  });

  //When stroke is finished, add it to our db.
  socket.on('end', function() {
    var finishedStroke = socket.stroke;

    //Get the board that the socket is connected to.
    var id = socket.nsp.name.slice(1);

    //Update the board with the new stroke.
    Board.boardModel.update({id: id},{$push: {strokes: finishedStroke} },{upsert:true},function(err, board){
      if(err){ console.log(err); }
      else {
        console.log("Successfully added");
      }
    });

    // Emit end event to everyone but the person who stopped drawing.
    socket.broadcast.emit('end', null);

    //Delete the stroke object to make room for the next stroke.
    delete socket.stroke;
  });
};

module.exports = drawing;
