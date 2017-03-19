var app = angular.module('motogpApp', []);

app.controller('motogpAdminCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.user = {
    username: "",
    password: "",
    name: "",
    test: false,
    admin: false
  }

  $scope.submitUser = function() {
    console.log($scope.user);

    $http.post('/api/users',
               $scope.user,
               null).then(
      function success(response) {
        alert("User created successfully.\n\nPlease remember your password.");
      },
      function error(response) {
        alert("There was a problem creating your password.\n\nPlease try again later.");
    });
  }

}]);