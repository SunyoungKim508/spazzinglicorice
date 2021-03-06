angular.module('devslate.codebox', ['ui.codemirror'])

.controller('CodeboxCtrl', function(Socket, $scope) {
  // set socket.io instance var
  var ioApi = Socket;

  // options for loading codemirror
  $scope.editorOptions = {
    lineWrapping: true,
    lineNumbers: true,
    mode: 'javascript',
    value: 'asdasdas',
    theme: 'solarized light',
    tabSize: 2,
    keyMap: 'sublime'

  };
  /**
   * codebox instance
   * @param   {obj}  _cm  cm instance
   */
  $scope.codebox = function(_cm) {
    _cm.setSize('100%', '100%');
    var cmClient;

    /**
     * initializes operational transform library
     * @param   {str}  str            the initial text for doc
     * @param   {??}  revision       revision number to track updates
     * @param   {??}  clients        [description]
     * @param   {[type]}  serverAdapter  [description]
     * @return  {[type]}                 [description]
     */
    var init = function(str, revision, clients, serverAdapter) {
      _cm.setValue(str);
      cmClient = new ot.EditorClient(
        revision,
        clients,
        serverAdapter,
        new ot.CodeMirrorAdapter(_cm)
        );
    };

    //define cm doc
    var _doc = _cm.getDoc();
    _cm.focus();

    // Options
    // _cm.setOption('firstLineNumber', 10);
    _doc.markClean();

     /* initialize cm text with ot on socket recieving doc
     */
    $scope.$on('socket-init', function() {
      Socket.on('doc', function(obj) {
        console.log(obj);
        init(obj.str, obj.revision, obj.clients, new ot.SocketIOAdapter(Socket.socket()));
      });
    });
  };
});
