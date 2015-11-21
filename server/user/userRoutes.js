// userRoutes.js
var userController = require('./userController.js');

module.exports = function (router) {
  // router === userRouter injected from middlware.js
  router.route('/todo')
    .get(userController.getTodos)
    .post(userController.addTodo);

  router.route('/bookmark')
    .get(userController.getBookmarks)
    .post(userController.addBookmark);
  
  router.get('/', userController.getUser);
};
