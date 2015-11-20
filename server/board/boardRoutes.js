// boardRoutes.js
var boardController = require('./boardController.js');

module.exports = function (router) {
  // router === userRouter injected from middlware.js

  router
    .post('/', boardController.createBoard);
};
