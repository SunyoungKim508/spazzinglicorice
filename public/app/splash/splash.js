angular.module('devslate.splash', [])

.controller('SplashCtrl', function ($scope, $stateParams) {
  // file drop config using dropzone.js --> need to move this out of splash
  Dropzone.autoDiscover = false;
  var myDropzone = new Dropzone("#drop", { url: "/file/post"});
  console.log(myDropzone);

});
