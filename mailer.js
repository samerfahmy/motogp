const nodemailer = require('nodemailer');
const cron = require('node-cron');
const mongoose    = require("mongoose")
const async       = require("async")

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'predictorgp@gmail.com',
    pass: 'ejEkxhdX'
  }
});

function sendQualifyingReminderEmail(recipient, raceName) {

	var mailOptions = {
    from: '"PredictorGP" <predictorgp@gmail.com>', // sender address
    to: recipient, // list of receivers
    subject: 'Reminder to predict for ' + raceName + ' qualifying', // Subject line
    text: 'This is a friendly reminder to put your predictions in for the ' + raceName + ' qualifying at http://motogp.tafasa.com.\n\nVisit http://www.motogp.com for info.\n\n\nSincerely,\nYour friends at PredictorGP', // plain text body
    //html: '' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info) {
	});
}

function sendRaceReminderEmail(recipient, raceName) {

	var mailOptions = {
    from: '"PredictorGP" <predictorgp@gmail.com>', // sender address
    to: recipient, // list of receivers
    subject: 'Reminder to predict for ' + raceName + ' race', // Subject line
    text: 'This is a friendly reminder to put your predictions in for the ' + raceName + ' race at http://motogp.tafasa.com.\n\nVisit http://www.motogp.com for info.\n\n\nSincerely,\nYour friends at PredictorGP', // plain text body
    //html: '' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info) {
	});
}
 
// Cron task every 60 minutes
var task = cron.schedule('*/60 * * * *', function() {

	var Race = require("./models/race").Race
  var Prediction = require("./models/prediction").Prediction
  var User = require("./models/user").User

  Race.findOne({race_start_time:{$gt:Date.now()}}, function(err, race) {

  	if (err || race === null || race.length == 0) {
  		return;
  	}

  	var timeToQualifying = Date.parse(race.qualifying_start_time) - Date.now();

  	// 24 hours before
  	if (timeToQualifying > 86400000) {
  		return;
  	}

  	var raceId = mongoose.Types.ObjectId(race._id);
  	var qualifying_start_time = race.qualifying_start_time;
  	var race_start_time = race.race_start_time;

  	Prediction.find({race_id:raceId}, function(err, predictions) {

  		if (err || predictions === null || predictions.length == 0) {
	  		return;
	  	}

	  	var qualifyingUsers = {}
	  	var raceUsers = {}
	  	var ignoredUsers = {}

	  	for (var i=0; i<predictions.length; i++) {

	  		var prediction = predictions[i];

		  	if (Date.parse(qualifying_start_time) > Date.now()) {

		  		if ((prediction.pole === null || prediction.trim().length() === 0) && !prediction.qualifing_reminder) {
		  			qualifyingUsers[prediction.user_id] = true;
		  		} else {
		  			ignoredUsers[prediction.user_id] = true;
		  		}

		  	} else if (Date.now() - Date.parse(qualifying_start_time) > 21600000) {

		  		if ((prediction.pole === null || prediction.pole.trim().length() === 0
		  				 || prediction.race_pos_1 === null || prediction.race_pos_1.trim().length() === 0
		  				 || prediction.race_pos_2 === null || prediction.race_pos_2.trim().length() === 0
		  				 || prediction.race_pos_3 === null || prediction.race_pos_3.trim().length() === 0
		  			)
		  		 && !prediction.qualifing_reminder) {
		  		 	raceUsers[prediction.user_id] = true;
		  		} else {
		  			ignoredUsers[prediction.user_id] = true;
		  		}
		  	}
		  }

  		User.find({}, function(err, users) {

  			if (err || users === null || users.length === 0) {
  				return;
  			}

  			for (var i=0; i<users.length; i++) {

  				var user = users[i];

  				if (ignoredUsers[user._id] == true) {
  					continue;
  				}

	  			var email = user.username;

	  			if (qualifyingUsers[user._id]) {
	  				sendQualifyingReminderEmail(email, race.location);
	  			} else if (raceUsers[user._id]) {
	  				sendRaceReminderEmail(email, race.location);
	  			}

	  			var savedPrediction = {
	  				qualifing_reminder: qualifyingUsers[user._id],
	  				race_reminder: raceUsers[user._id]
	  			}

	  			var userId = mongoose.Types.ObjectId(user._id)

	  			Prediction.findOneAndUpdate({"user_id":userId, "race_id":raceId}, savedPrediction, {upsert:false}, function(err, data) {
		      });
	  		}

  		})

  	})

  })
  
});

function startEmailRemindersJob() {
	console.log("Starting email reminders cron job")
	task.start()
}

module.exports = {
	startEmailRemindersJob: startEmailRemindersJob
}