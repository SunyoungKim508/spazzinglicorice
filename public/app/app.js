angular.module('devslate', [
  'devslate.services',
  'ui.router',
  'devslate.chatbox',
  'devslate.codebox',
  'devslate.splash',
  'devslate.toolbar',
  'devslate.user',
  'devslate.whiteboard',
  'devslate.filedrop'
])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('splash', {
        url: '/splash',
        templateUrl: 'app/splash/splash.html',
        controller: 'SplashCtrl'
      })
      .state('board', {
        url: '/board/:boardUrl',
        views: {
          'filedrop': {
            templateUrl: 'app/filedrop/filedrop.html',
            controller: 'FiledropCtrl'
          },
          'whiteboard': {
            templateUrl: 'app/whiteboard/whiteboard.html',
            controller: 'WhiteboardCtrl'
          },
          'codebox': {
            templateUrl: 'app/codebox/codebox.html',
            controller: 'CodeboxCtrl'
          },
          'chatbox': {
            templateUrl: 'app/chatbox/chatbox.html',
            controller: 'ChatboxCtrl'
          },
          'toolbar': {
            templateUrl: 'app/toolbar/toolbar.html',
            controller: 'ToolbarCtrl'
          }
        }
      })
      .state('userpage', {
        url: '/user',
        templateUrl: 'app/user/userpage.html',
        controller: 'UserCtrl',
        authenticate: true
      });
      $urlRouterProvider.otherwise('/splash');
  })

// Make sure the stateprovider routes get started up
.run(['$state', '$rootScope', 'Authenticate', '$http', function ($state, $rootScope, Authenticate, $http) {

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
    
    $http.get('/authenticate').then(function (response) {
      var facebookId =  response.data;
      if (toState.authenticate && !facebookId){
        // User isn’t authenticated
        $state.transitionTo("splash");
        event.preventDefault(); 
      }
    })
  });

  // $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
    
  //   console.log("Authenticate", !Authenticate.isAuthenticated());
  //   if (toState.authenticate && !Authenticate.isAuthenticated()){
  //     // User isn’t authenticated
  //     $state.transitionTo("splash");
  //     event.preventDefault(); 
  //   }
  // });
}]);
