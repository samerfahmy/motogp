var app = angular.module('motogpApp', ['ngMaterial']);

app.controller('motogpCtrl', function($scope, $http, $mdToast) {

  $scope.user = null
  $scope.races = null
  $scope.riders = null
  $scope.loggedIn = false


  $scope.checkExpired = function(date) {
  	console.log("Date1: " + date)
  	console.log("Date2: " + Date.now())

  	var srcDate = Date.parse(date)
  	
  	return srcDate <= Date.now()
  }

  $scope.login = function() {
  	console.log("Username: " + $scope.username)
  	console.log("Password: " + $scope.password)

  	$http.post('/api/login',
  						 {
  						 	username: $scope.username,
  						 	password: $scope.password
  						 },
  						 null).then(
  		function success(response) {
  			console.log("success " + response.data)
  			$scope.user = response.data
  			$scope.loggedIn = true

  			$scope.getData()
  		},
  		function error(response) {
  			console.log("error")

  			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Error signing in')
		        .position('top')
		        .hideDelay(1000)
		    );
  	});
  }

  $scope.getData = function() {
  	
  	// Get all the races
  	$http.get('/api/races',
  						 null,
  						 null).then(
  		function success(response) {
  			console.log("success " + response.data)
  			$scope.races = response.data
  		},
  		function error(response) {
  			console.log("error")
  	});

  	// Get all the riders
  	$http.get('/api/riders',
  						 null,
  						 null).then(
  		function success(response) {
  			console.log("success " + response.data)
  			$scope.riders = response.data
  		},
  		function error(response) {
  			console.log("error")
  	});

  	// Get all predictions for the user
  	$http.get('/api/users/' + $scope.user._id + '/predictions',
  						 null,
  						 null).then(
  		function success(response) {
  			console.log("success " + response.data)
  			var predictions = response.data
  			for (var i=0; i<predictions.length; i++) {
  				var prediction = predictions[i]

  				for (var j=0; j<$scope.races.length; j++) {
  					var race = $scope.races[j]
  					if (race["_id"] === prediction["race_id"]) {
  						race["selected_pole"] = prediction["pole"]
  						race["selected_race_pos_1"] = prediction["race_pos_1"]
  						race["selected_race_pos_2"] = prediction["race_pos_2"]
  						race["selected_race_pos_3"] = prediction["race_pos_3"]
  					}
  				}
  			}
  		},
  		function error(response) {
  			console.log("error")
  	});
  }

  $scope.postPredictions = function() {

  	var predictions = []

  	for (var i=0; i<$scope.races.length; i++) {
  		var race = $scope.races[i]
  		var raceId = race._id
  		var qualifyingStartTime = race.qualifying_start_time
  		var raceStartTime = race.race_start_time
  		var pole = race.selected_pole
  		var racePos1 = race.selected_race_pos_1
  		var racePos2 = race.selected_race_pos_2
  		var racePos3 = race.selected_race_pos_3

  		var prediction = {}

  		prediction.race_id = raceId

  		if (!$scope.checkExpired(qualifyingStartTime)) {
  			prediction.pole = pole
  			prediction.entry_time = Date.now()
  		}

  		if (!$scope.checkExpired(raceStartTime)) {
  			prediction.race_pos_1 = racePos1
  			prediction.race_pos_2 = racePos2
  			prediction.race_pos_3 = racePos3
  			prediction.entry_time = Date.now()
  		}

  		predictions.push(prediction)
  	}

  	$http.post('/api/users/' + $scope.user._id + '/predictions',
  						 predictions,
  						 null).then(
  		function success(response) {
  			console.log("success posting predictions" + response.data)

  			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Success!')
		        .position('top')
		        .hideDelay(1000)
		    );
  		},
  		function error(response) {
  			console.log("error")
  	});

  }

});