var app = angular.module('motogpApp', ['ngMaterial', 'ngCookies']);

app.config(function($mdThemingProvider, $mdAriaProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('brown')

    $mdAriaProvider.disableWarnings();
});

app.controller('motogpCtrl', ['$scope', '$http', '$mdToast', '$mdDialog', '$cookies', function($scope, $http, $mdToast, $mdDialog, $cookies) {

  $scope.user = {
  	_id : $cookies.get('user_id'),
  	name : $cookies.get('user_name')
  }
  $scope.races = null
  $scope.riders = null
  $scope.loggedIn = false
  $scope.initialized = false

  $scope.predictionRace = null

  $scope.scoreDialogElement = null

  $scope.checkExpired = function(date) {
  	var srcDate = Date.parse(date)
  	
  	return srcDate <= Date.now()
  }

  $scope.showScoreDialog = function(ev, data) {
  	$scope.scoreDialogElement = data
  	$mdDialog.show({
      contentElement: '#scoreDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  $scope.login = function() {
  	$http.post('/api/login',
  						 {
  						 	username: $scope.username,
  						 	password: $scope.password
  						 },
  						 null).then(
  		function success(response) {
  			$scope.user = response.data

  			$cookies.put('user_id', response.data._id)
  			$cookies.put('user_name', response.data.name)

  			$scope.loggedIn = true

  			$scope.getData()
  		},
  		function error(response) {
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
  			$scope.races = response.data
  			for (var i=0; i<$scope.races.length; i++) {
					var race = $scope.races[i]
					var qualifying_start_time_str = moment(race["qualifying_start_time"]).format("dddd, MMMM Do, h:mm a");
					var race_start_time_str = moment(race["race_start_time"]).format("dddd, MMMM Do, h:mm a");
					race["qualifying_start_time_str"] = qualifying_start_time_str
					race["race_start_time_str"] = race_start_time_str

					if ($scope.predictionRace == null && (!$scope.checkExpired(race["qualifying_start_time"]) || !$scope.checkExpired(race["race_start_time"]))) {
						$scope.predictionRace = race
					}
				}
  		},
  		function error(response) {
  	});

  	// Get all the riders
  	$http.get('/api/riders',
  						 null,
  						 null).then(
  		function success(response) {
  			$scope.riders = response.data
  		},
  		function error(response) {
  	});

  	// Get all predictions for the user
  	$http.get('/api/users/' + $scope.user._id + '/predictions',
  						 null,
  						 null).then(
  		function success(response) {
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

  						var predictionRace = $scope.predictionRace
  						if (race["_id"] === predictionRace["_id"]) {
  							$scope.predictionRace = race
  						}
  					}
  				}
  			}
  		},
  		function error(response) {
  	});

		// Get all the results
  	$http.get('/api/scores',
  						 null,
  						 null).then(
  		function success(response) {
  			$scope.scores = response.data
  		},
  		function error(response) {
  	});
  }

  $scope.postPredictions = function() {

  	var predictions = []

  	// for (var i=0; i<$scope.races.length; i++) {
  	// 	var race = $scope.races[i]
  	// 	var raceId = race._id
  	// 	var qualifyingStartTime = race.qualifying_start_time
  	// 	var raceStartTime = race.race_start_time
  	// 	var pole = race.selected_pole
  	// 	var racePos1 = race.selected_race_pos_1
  	// 	var racePos2 = race.selected_race_pos_2
  	// 	var racePos3 = race.selected_race_pos_3

  	// 	var prediction = {}

  	// 	prediction.race_id = raceId

  	// 	if (!$scope.checkExpired(qualifyingStartTime)) {
  	// 		prediction.pole = pole
  	// 		prediction.entry_time = Date.now()
  	// 	}

  	// 	if (!$scope.checkExpired(raceStartTime)) {
  	// 		prediction.race_pos_1 = racePos1
  	// 		prediction.race_pos_2 = racePos2
  	// 		prediction.race_pos_3 = racePos3
  	// 		prediction.entry_time = Date.now()
  	// 	}

  	// 	predictions.push(prediction)
  	// }

		var prediction = {}

		prediction.race_id = $scope.predictionRace._id

		if (!$scope.checkExpired(prediction["qualifying_start_time"])) {
			prediction.pole = $scope.predictionRace.selected_pole
			prediction.entry_time = Date.now()
		}

		if (!$scope.checkExpired(prediction["race_start_time"])) {
			prediction.race_pos_1 = $scope.predictionRace.selected_race_pos_1
			prediction.race_pos_2 = $scope.predictionRace.selected_race_pos_2
			prediction.race_pos_3 = $scope.predictionRace.selected_race_pos_3
			prediction.entry_time = Date.now()
		}

		predictions.push(prediction)

  	$http.post('/api/users/' + $scope.user._id + '/predictions',
  						 predictions,
  						 null).then(
  		function success(response) {
  			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Success!')
		        .position('top')
		        .hideDelay(1000)
		    );
  		},
  		function error(response) {
  	});
  }

  $scope.init = function() {
  	if ($scope.user._id && $scope.user.name) {
	  	$scope.loggedIn = true

	  	$scope.getData()
	  }
	  $scope.initialized = true
	}

}]);