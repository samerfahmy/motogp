var app = angular.module('motogpApp', ['ngMaterial', 'ngCookies']);

app.config(function($mdThemingProvider, $mdAriaProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('blue')

    $mdAriaProvider.disableWarnings();

    // Enable browser color
    $mdThemingProvider.enableBrowserColor({
      palette: 'accent'
    });
});

app.controller('motogpCtrl', ['$scope', '$http', '$mdToast', '$mdDialog', '$cookies', '$window',
                function($scope, $http, $mdToast, $mdDialog, $cookies, $window) {

  $scope.user = null
  $scope.races = null
  $scope.adminRaces = null
  $scope.riders = null
  $scope.isAdmin = false
  $scope.predictionRace = null
  $scope.scoreDialogElement = null
  $scope.adminUser = {}
  $scope.contentLoaded = {
    racesLoaded: false,
    ridersLoaded: false,
    scoresLoaded: false,
    predictionsLoaded: false
  }
  $scope.loadedState = {
    loggingIn: false,
    loggedIn: false,
    initialized: false
  }

  $scope.checkLoggedIn = function() {

    var isLoggedIn =
      $scope.contentLoaded.racesLoaded &&
      $scope.contentLoaded.ridersLoaded &&
      $scope.contentLoaded.scoresLoaded &&
      $scope.contentLoaded.predictionsLoaded

    if (isLoggedIn) {
      var state = {
        initialized: true,
        loggingIn: true,
        loggedIn: true
      }
      $scope.loadedState = state
    }

  }

  $scope.checkExpired = function(date, offset) {
    if (offset === undefined) {
      offset = 0
    }

    var srcDate = Date.parse(date)
    var srcDateModified = new Date(date)
    srcDateModified.setSeconds(srcDateModified.getSeconds() + offset)

    return srcDateModified <= Date.now()
  }

  $scope.checkForEmpty = function(src) {
    if (src != null && src.trim().length === 0) {
      return null
    }
    return src
  }

  $scope.showScoreDialog = function(ev, user_name, race_location, prediction, results) {
  	$scope.scoreDialogElement = {
      user_name : user_name,
      race_location : race_location,
      prediction : prediction,
      results : results
    };
  	$mdDialog.show({
      contentElement: '#scoreDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  $scope.showPredictions = function(race_location) {
    console.log("Checking if we should show predictions for " + race_location);
    console.log("current race: " + $scope.predictionRace.location);
    if (race_location == $scope.predictionRace.location) {
      console.log("returning true");
      return true;
    }

    console.log("returning false");
    return false;
  }

  $scope.login = function() {
    $scope.loadedState.loggingIn = true

  	$http.post('/api/login',
  						 {
  						 	username: $scope.username,
  						 	password: $scope.password
  						 },
  						 null).then(
  		function success(response) {
  			$scope.user = response.data

        // expire in 1 year
        var expiryDate = new Date()
        expiryDate = new Date(expiryDate.setDate(expiryDate.getDate() + 365))

        // create cookie options
        var cookieOptions = {
          expires: expiryDate
        }

  			$cookies.put('user_id', response.data._id, cookieOptions)
  			$cookies.put('user_name', response.data.name, cookieOptions)

  			$scope.getData()
  		},
  		function error(response) {
        $scope.loadedState.loggingIn = false
  			$mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Error signing in!')
            .textContent('Please check your password and try again.')
            .ok('OK')
        );
  	});
  }

  $scope.logout = function() {
    $cookies.remove('user_id');
    $cookies.remove('user_name');
    $window.location.reload();
  }

  $scope.submitUser = function() {
    $http.post('/api/users',
               $scope.adminUser,
               null).then(
      function success(response) {
        alert("User created successfully.\n\nPlease remember your password.");
      },
      function error(response) {
        alert("There was a problem creating your password.\n\nPlease try again later.");
    });
  }

  $scope.showPoints = function() {
    alert("These are the points awared:\n\n+ 1 point for predicting the correct pole position\n+ 1 point for predicting a rider who is on the podium\n+ 1 point for predicting a rider in their correct position\n+ 1 point for predicting the rider with the fastest lap\n");
  }

  $scope.getData = function() {
    // Get all the races
  	$http.get('/api/races',
  						 null,
  						 null).then(
  		function success(response) {
  			$scope.races = response.data
        // Create a copy for admin purposes
        $scope.adminRaces = response.data.slice();
  			for (var i=0; i<$scope.races.length; i++) {
					var race = $scope.races[i]
					var qualifying_start_time_str = moment(race["qualifying_start_time"]).format("dddd, MMMM Do, h:mm a");
					var race_start_time_str = moment(race["race_start_time"]).format("dddd, MMMM Do, h:mm a");
					race["qualifying_start_time_str"] = qualifying_start_time_str
					race["race_start_time_str"] = race_start_time_str

					if ($scope.predictionRace == null && (!$scope.checkExpired(race["qualifying_start_time"]) || !$scope.checkExpired(race["race_start_time"], 86400))) {
            $scope.predictionRace = race
					}
				}

        $scope.contentLoaded.racesLoaded = true;
        $scope.checkLoggedIn();

        $scope.getPredictions();
  		},
  		function error(response) {
        $scope.contentLoaded.racesLoaded = true;
        $scope.checkLoggedIn();
  	});

  	// Get all the riders
  	$http.get('/api/riders',
  						 null,
  						 null).then(
  		function success(response) {
  			$scope.riders = response.data

        $scope.contentLoaded.ridersLoaded = true;
        $scope.checkLoggedIn();
  		},
  		function error(response) {
        $scope.contentLoaded.ridersLoaded = true;
        $scope.checkLoggedIn();
  	});

		// Get all the results
  	$http.get('/api/scores',
  						 null,
  						 null).then(
  		function success(response) {
  			$scope.scores = response.data

        $scope.contentLoaded.scoresLoaded = true;
        $scope.checkLoggedIn();
  		},
  		function error(response) {
        $scope.contentLoaded.scoresLoaded = true;
        $scope.checkLoggedIn();
  	});

    // Check the admin status
    $http.get('/api/check-admin',
               null,
               null).then(
      function success(response) {
        $scope.isAdmin = response.data.isAdmin
      },
      function error(response) {
    });
  }

  $scope.getPredictions = function() {
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
              race["selected_race_fastest_lap"] = prediction["race_fastest_lap"]

              var predictionRace = $scope.predictionRace
              if (predictionRace && race["_id"] === predictionRace["_id"]) {
                $scope.predictionRace = race
              }
            }
          }
        }

        $scope.contentLoaded.predictionsLoaded = true;
        $scope.checkLoggedIn();
      },
      function error(response) {
        $scope.contentLoaded.predictionsLoaded = true;
        $scope.checkLoggedIn();
    });
  }

  $scope.postPredictions = function() {

    $scope.postingPredictions = true;

    // verify the inputs first
    var selectionsArray = []
    selectionsArray[0] = $scope.checkForEmpty($scope.predictionRace.selected_race_pos_1)
    selectionsArray[1] = $scope.checkForEmpty($scope.predictionRace.selected_race_pos_2)
    selectionsArray[2] = $scope.checkForEmpty($scope.predictionRace.selected_race_pos_3)

    for (var i=0; i<selectionsArray.length; i++) {
      for (var j=0; j<selectionsArray.length; j++) {
        if (i != j && selectionsArray[i] === selectionsArray[j] && selectionsArray[i] != null) {
          // duplicate selection, return an error
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.body))
              .clickOutsideToClose(true)
              .title('Error')
              .textContent('You\'ve picked ' + selectionsArray[i] + ' more than once.')
              .ok('OK')
          );
          $scope.postingPredictions = false;
          return;
        }
      }
    }

  	var predictions = []
		var prediction = {}

		prediction.race_id = $scope.predictionRace._id

		if ($scope.predictionRace.selected_pole && !$scope.checkExpired(prediction["qualifying_start_time"])) {
			prediction.pole = $scope.checkForEmpty($scope.predictionRace.selected_pole)
			prediction.entry_time = Date.now()
		}

		if (!$scope.checkExpired(prediction["race_start_time"])) {
			prediction.race_pos_1 = $scope.checkForEmpty($scope.predictionRace.selected_race_pos_1)
			prediction.race_pos_2 = $scope.checkForEmpty($scope.predictionRace.selected_race_pos_2)
      prediction.race_pos_3 = $scope.checkForEmpty($scope.predictionRace.selected_race_pos_3)
      prediction.race_fastest_lap = $scope.checkForEmpty($scope.predictionRace.selected_race_fastest_lap)
			prediction.entry_time = Date.now()
		}

		predictions.push(prediction)

  	$http.post('/api/users/' + $scope.user._id + '/predictions',
  						 predictions,
  						 null).then(
  		function success(response) {
  			$mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Success!')
            .textContent('Your predictions have been posted. Good luck!')
            .ok('OK')
        );
        $scope.postingPredictions = false;
  		},
  		function error(response) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent('Please try to post your results again.')
            .ok('OK')
        );
        $scope.postingPredictions = false;
  	});
  }

  $scope.postResults = function(raceId) {

    $scope.postingResults = true;

    var results = [];

    // verify the inputs first
    for (var x=0; x<$scope.adminRaces.length; x++) {
      var race = $scope.races[x];

      if (race._id != raceId) {
        continue;
      }

      var selectionsArray = []
      selectionsArray[0] = $scope.checkForEmpty(race.race_pos_1)
      selectionsArray[1] = $scope.checkForEmpty(race.race_pos_2)
      selectionsArray[2] = $scope.checkForEmpty(race.race_pos_3)

      for (var i=0; i<selectionsArray.length; i++) {
        for (var j=0; j<selectionsArray.length; j++) {
          if (i != j && selectionsArray[i] === selectionsArray[j] && selectionsArray[i] != null) {
            // duplicate selection, return an error
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title('Error')
                .textContent('You\'ve picked ' + selectionsArray[i] + ' more than once.')
                .ok('OK')
            );
            $scope.postingResults = false;
            return;
          }
        }
      }

      var result = {}

      result._id = race._id
      result.pole = $scope.checkForEmpty(race.pole)
      result.race_pos_1 = $scope.checkForEmpty(race.race_pos_1)
      result.race_pos_2 = $scope.checkForEmpty(race.race_pos_2)
      result.race_pos_3 = $scope.checkForEmpty(race.race_pos_3)
      result.race_fastest_lap = $scope.checkForEmpty(race.race_fastest_lap)

      results.push(result)
    }

    $http.post('/api/races/results',
               results,
               null).then(
      function success(response) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Success!')
            .textContent('Results have been posted!')
            .ok('OK')
        );
        $scope.postingResults = false;
      },
      function error(response) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent('Please try to post your results again.')
            .ok('OK')
        );
        $scope.postingResults = false;
    });
  }

  $scope.init = function() {

    $scope.user = {
      _id : $cookies.get('user_id'),
      name : $cookies.get('user_name')
    }

  	if ($scope.user._id && $scope.user.name) {
      $scope.getData()
	  } else {
      $scope.loadedState.initialized = true
    }
	}

}]);