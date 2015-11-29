angular.module('devslate.splash', [])

.controller('SplashCtrl', function ($scope, $stateParams, Authenticate) {
  $scope.userIsAuth = false;

  var getAuthStatus = function () {
    Authenticate.isAuthenticated().then(function (authStatus) {
      $scope.userIsAuth = authStatus;
    })
  }

  getAuthStatus();
});
