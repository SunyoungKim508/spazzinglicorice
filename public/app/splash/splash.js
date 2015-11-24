angular.module('devslate.splash', [])

.controller('SplashCtrl', function ($scope, $stateParams, Authenticate, $http) {
  $http.get('/authenticate').then(function (response) {
    var facebookId =  response.data;
    $scope.userIsAuth = facebookId;
  });
});
