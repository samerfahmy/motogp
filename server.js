var express     = require('express')
var app         = express()
var bodyParser  = require("body-parser")
var router      = express.Router()
var mongoose    = require("mongoose")
var async       = require("async")

var DATABASE_PROD   = "mongodb://samer:SUXhfyuLNFrSfmsU@ds129010.mlab.com:29010/motogp"
var DATABASE_LOCAL  = "mongodb://localhost:27017/motogp"

console.log("process.env.NODE_ENV: " + process.env.NODE_ENV)
console.log("process.env.PORT: " + process.env.PORT)

/* Load config settings */
var DATABASE = process.env.NODE_ENV && process.env.NODE_ENV == 'production' ? DATABASE_PROD : DATABASE_LOCAL
var PORT     = process.env.PORT ? process.env.PORT : 3000

console.log("database: " + DATABASE)
console.log("port: " + PORT)

/* Expose a public static folder called 'public' */
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: "index.html",
  maxAge: '0',
  redirect: false
}
app.use(express.static('public', options))

/* Initialize settings */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use('/',router);
// Open database
mongoose.connect(DATABASE);

/* Status check endpoint */
router.route("/api/_status").get(function(req,res){
  var response = {}
  var statusCode = 200

  var User = require("./models/user").User

  User.findOne({},function(err,data){
    // Mongo command to fetch all data from collection.
    if (err) {
        response = {"message" : "DB Error"}
        statusCode = 500
    }

    res.statusCode = statusCode
    res.json(response)
  });
});

router.route("/api/login").post(function(req,res){
  var response = {}
  var User = require("./models/user").User

  var username = req.body.username.toLowerCase()
  var password = req.body.password

  User.findOne({"username":username},function(err,data){
    // Mongo command to fetch all data from collection.
    if (err || data === null || data.length === 0 || password != data.password) {
        response = {"message" : "Bad authentication"}
        res.statusCode = 404
        res.json(response)
        return
    }
    
    response = data

    res.json(response)
  });
});

router.route("/api/races").get(function(req,res){
  var response = {}
  var Race = require("./models/race").Race

  var query = Race.find({})
                  .sort({"qualifying_start_time":1})

  query.exec(function(err,data) {
    // Mongo command to fetch all data from collection.
    if (err || data === null || data.length === 0) {
        response = {"message" : "Error occured"}
        res.statusCode = 400
        res.json(response)
        return
    }
    
    response = data

    res.json(response)
  });
});

router.route("/api/riders").get(function(req,res){
  var response = {}
  var Rider = require("./models/rider").Rider

  var query = Rider.find({})
                   .sort({"name":1})

  query.exec(function(err,data) {
    // Mongo command to fetch all data from collection.
    if (err || data === null || data.length === 0) {
        response = {"message" : "Error occured"}
        res.statusCode = 400
        res.json(response)
        return
    }
    
    response = data

    res.json(response)
  });
});

router.route("/api/users/:user_id/predictions").get(function(req,res){
  var response = {}
  var Prediction = require("./models/prediction").Prediction

  //var userId = mongoose.Types.ObjectId(req.params.user_id)

  //var query = Prediction.find({"user_id":userId})
  var query = Prediction.find({})

  query.exec(function(err,data) {
    // Mongo command to fetch all data from collection.
    if (err || data === null || data.length === 0) {
        response = {"message" : "Error occured"}
        res.statusCode = 400
        res.json(response)
        return
    }

    response = data

    res.json(response)
  });
});

router.route("/api/users/:user_id/race/:race_id/predictions").get(function(req,res){
  var response = {}
  var Prediction = require("./models/prediction").Prediction

  var userId = mongoose.Types.ObjectId(req.params.user_id)
  var raceId = mongoose.Types.ObjectId(req.params.race_id)

  var predictions = req.body

  console.log("Predictions: " + predictions.length)

  var query = Prediction.findOne({"user_id":userId, "race_id":raceId})

  query.exec(function(err,data) {
    // Mongo command to fetch all data from collection.
    if (err || data === null || data.length === 0) {
        response = {"message" : "Error occured"}
        res.statusCode = 400
        res.json(response)
        return
    }

    response = data

    res.json(response)
  });
});

router.route("/api/users/:user_id/predictions").post(function(req,res){
  var response = {}
  var Prediction = require("./models/prediction").Prediction

  var userId = mongoose.Types.ObjectId(req.params.user_id)

  var predictions = req.body

  console.log("Predictions: " + predictions.length)

  for (var i=0; i<predictions.length; i++) {

    var prediction = predictions[i]

    console.log("Prediction: " + prediction)

    var raceId = mongoose.Types.ObjectId(prediction.race_id)

    Prediction.findOneAndUpdate({"user_id":userId, "race_id":raceId}, prediction, {upsert:true}, function(err, doc){
        if (err) {
          console.log("Error! " + err)
        }
    });
  }

  res.json(response)
});

router.route("/api/scores").get(function(req,res){
  var response = {}
  var Race = require("./models/race").Race
  var Prediction = require("./models/prediction").Prediction
  var User = require("./models/user").User

  async.parallel({
    races: function(cb){
      Race.find({}, cb);
    },
    predictions: function(cb){
      Prediction.find({}, cb);
    },
    users: function(cb){
      User.find({test:{"$ne":true}}, cb);
    }
  }, function(err, results){

    var users = results.users
    var predictions = results.predictions
    var races = results.races
    var racesArray = []

    for (var i=0; i<races.length; i++) {

      var race = races[i]

      var usersArray = []
      var predictionsArray = []

      for (var j=0; j<users.length; j++) {
        var user = users[j]

        var userPrediction = null
        var score = 0
        var raceComplete = false

        for (var k=0; k<predictions.length; k++) {
          var prediction = predictions[k]

          if (prediction.user_id === user._id) {
            userPrediction = prediction
            break;
          }
        } // predictions

        // calculate the score
        if (race.pole && race.race_pos_1) {
          raceComplete = true

          if (race.pole === prediction.pole) {
            score = score + 1
          }

          if (prediction.race_pos_1 === race.race_pos_1 || prediction.race_pos_1 === race.race_pos_2 || prediction.race_pos_1 === race.race_pos_3) {
            score = score + 1
          }

          if (prediction.race_pos_1 === race.race_pos_1) {
            score = score + 1
          }

          if (prediction.race_pos_2 === race.race_pos_1 || prediction.race_pos_2 === race.race_pos_2 || prediction.race_pos_2 === race.race_pos_3) {
            score = score + 1
          }

          if (prediction.race_pos_2 === race.race_pos_2) {
            score = score + 1
          }

          if (prediction.race_pos_2 === race.race_pos_1 || prediction.race_pos_3 === race.race_pos_2 || prediction.race_pos_3 === race.race_pos_3) {
            score = score + 1
          }

          if (prediction.race_pos_3 === race.race_pos_3) {
            score = score + 1
          }

        }

        var predictionObject = {
          user: user.name,
          location: race.location,
          race_id: race._id,
          prediction: {
            pole: prediction.pole,
            race_pos_1: prediction.race_pos_1,
            race_pos_2: prediction.race_pos_2,
            race_pos_3: prediction.race_pos_3
          },
          results: {
            pole: race.pole,
            race_pos_1: race.race_pos_1,
            race_pos_2: race.race_pos_2,
            race_pos_3: race.race_pos_3
          },
          score: score,
          race_complete: raceComplete
        }

        predictionsArray.push(predictionObject)
        usersArray.push(user.name)

      } // users

      response[race.location] = predictionsArray
      racesArray.push(race.location)

    } // races

    response.users = usersArray
    response.races = racesArray

    res.json(response)

  });
});


app.listen(PORT)
console.log("Listening on port " + PORT)