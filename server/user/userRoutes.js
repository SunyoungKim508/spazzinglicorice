// userRoutes.js
var userController = require('./userController.js');

module.exports = function (router) {
  // router === userRouter injected from middlware.js
  router
    .get('/todo', userController.getTodos)
    .post('/todo', userController.addTodo)
    .get('/bookmark', userController.getBookmarks)
    .post('/bookmark', userController.addBookmark)
    .get('/', userController.getUser);
};
