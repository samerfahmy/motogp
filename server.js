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

  var userId = mongoose.Types.ObjectId(req.params.user_id)

  var query = Prediction.find({"user_id":userId})

  query.exec(function(err,data) {
    // Mongo command to fetch all data from collection.
    if (err) {
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
  var Race = require("./models/race").Race
  var Utils = require("./utils")

  var userId = mongoose.Types.ObjectId(req.params.user_id)

  var predictions = req.body

  var totalProcessed = 0

  for (var i=0; i<predictions.length; i++) {

    var prediction = predictions[i]

    // verify the inputs first
    if (Utils.checkPredictionForDuplicates(prediction)) {
      res.statusCode = 400
      totalProcessed++;
      if (totalProcessed == predictions.length) {
        res.json(response)
      }
      continue;
    }

    var raceId = mongoose.Types.ObjectId(prediction.race_id)

    Race.findOne({"_id":raceId}, function(err, race) {

      if (err || race === null || race.length === 0 ) {
        res.statusCode = 500
        totalProcessed++;
        if (totalProcessed == predictions.length) {
          res.json(response)
        }
        return;
      }

      var sanitizedPrediction = {}

      if (!Utils.checkExpired(race.qualifying_start_time)) {
        sanitizedPrediction.pole = prediction.pole
        sanitizedPrediction.entry_time = Date.now()
      }

      if (!Utils.checkExpired(race.race_start_time)) {
        sanitizedPrediction.race_pos_1 = prediction.race_pos_1
        sanitizedPrediction.race_pos_2 = prediction.race_pos_2
        sanitizedPrediction.race_pos_3 = prediction.race_pos_3
        sanitizedPrediction.entry_time = Date.now()
      }

      Prediction.findOneAndUpdate({"user_id":userId, "race_id":raceId}, sanitizedPrediction, {upsert:true}, function(err, data){
        if (err) {
          res.statusCode = 500
          response = err
        }

        // Because of the async nature of the DB calls, we will send the response when
        // all have been processed
        totalProcessed++

        if (totalProcessed == predictions.length) {
          res.json(response)
        }
      });

    })
  }
});

router.route("/api/scores").get(function(req,res){
  var response = {}
  var Race = require("./models/race").Race
  var Prediction = require("./models/prediction").Prediction
  var User = require("./models/user").User

  async.parallel({
    races: function(cb){
      Race.find({}, cb).sort({race_start_time:1});
    },
    predictions: function(cb){
      Prediction.find({}, cb);
    },
    users: function(cb){
      User.find({test:{"$ne":true}}, cb);
    }
  }, function(err, results){

    hash = function(srcData) {
      var data = srcData.toString();
      var hash = 0, i, chr;
      if (data.length === 0) return hash;
      for (i = 0; i < data.length; i++) {
        chr   = data.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };

    var users = results.users
    var predictions = results.predictions
    var races = results.races

    var processed_race_results = {};
    var race_list = [];
    var now = new Date();
    for (var i=0; i<races.length; i++) {
      var race = races[i];

      var race_data = {
        race_id : race._id,
        location: race.location,
        pole : race.pole,
        race_pos_1 : race.race_pos_1,
        race_pos_2 : race.race_pos_2,
        race_pos_3 : race.race_pos_3,
        qualification_completed : race.pole != null,
        qualification_started : race.qualifying_start_time < now,
        race_completed : race.race_pos_1 != null,
        race_started : race.race_start_time < now
      };        

      processed_race_results[race._id] = race_data;
      race_list.push(race_data);
    }

    var processed_users = {};
    for (var i=0; i<users.length; i++) {
        var user = users[i];
        user.hashed_id = hash(user._id);
        processed_users[user.hashed_id] = {
          total : 0,
          name : user.name,
          races : {}
        }
    }

    for (var i=0; i<predictions.length; i++) {
      var prediction = predictions[i]

      var race_id = prediction.race_id;
      var user_id = hash(prediction.user_id);
      var race_result = processed_race_results[race_id];
      if (race_result) {
        var calculated_score = 0;

        prediction_data = {}
        
        if (race_result.qualification_started) {
          prediction_data.pole = prediction.pole;
        }

        if (race_result.qualification_completed) {
          calculated_score += race_result.pole == prediction.pole ? 1 : 0;
        }

        if (race_result.race_started) {
          prediction_data.race_pos_1 = prediction.race_pos_1;
          prediction_data.race_pos_2 = prediction.race_pos_2;
          prediction_data.race_pos_3 = prediction.race_pos_3;
        }

        if (race_result.race_completed) {
          var winners = {};
          winners[race_result.race_pos_1] = true;
          winners[race_result.race_pos_2] = true;
          winners[race_result.race_pos_3] = true;

          if (winners[prediction.race_pos_1]) {
            calculated_score += prediction.race_pos_1 == race_result.race_pos_1 ? 2 : 1;
          }

          if (winners[prediction.race_pos_2]) {
            calculated_score += prediction.race_pos_2 == race_result.race_pos_2 ? 2 : 1;
          }

          if (winners[prediction.race_pos_3]) {
            calculated_score += prediction.race_pos_3 == race_result.race_pos_3 ? 2 : 1;
          }
        }

        prediction_data.score = calculated_score;

        if (processed_users[user_id]) {
          processed_users[user_id].races[race_id] = prediction_data;
          processed_users[user_id].total += calculated_score;
        }
      }
    }

    var sorted_user_id_tuples = Object.keys(processed_users).map(function(key) {
        return [key, processed_users[key].total];
    });
    sorted_user_id_tuples.sort(function(first, second) {
        return second[1] - first[1];
    });

    var sorted_user_ids = [];
    for (var i = 0; i < sorted_user_id_tuples.length; i++) {
      sorted_user_ids.push(sorted_user_id_tuples[i][0]);
    }

    response.user_ids = sorted_user_ids;
    response.user_data = processed_users;
    response.races = race_list;

    res.json(response)

  });
});


app.listen(PORT)
console.log("Listening on port " + PORT)