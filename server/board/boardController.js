// boardControllers.js
var Board = require('../../db/board.js');
var User = require('../../db/user.js');

module.exports = {
  createBoard: function (req, res, next) {
    // TODO: session - user
    var user = "Sunyoung";
    var boardname = req.body.name;
    var board = new Board({strokes: [], name: boardname});

    User.findOne({firstName: user}).exec(function (err, user) {
      if (user) {
        
        user.bookmarks.push({name: boardname, url: board._id.toString()});
        user.save(function (err, user) {
          if (err) {console.log('err!')};
          board.save(function(err, board) {
            if (err) { console.error(err); }
            else {
              res.redirect('/' + board._id);
              console.log('board saved!');
            }
          });          
        });
      } else {
        console.log('log in first');
      }
      if (err) {
        next(err);
      }
    });
  },

  gotoBoard: function (req, res) {
    var url = req.params.url;
    res.redirect('/'+url);
  }
}
