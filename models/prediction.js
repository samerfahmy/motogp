var mongoose = require("mongoose");

var PredictionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  race_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  entry_time: {
    type: Date,
    default: Date.now
  },
  pole: String,
  race_pos_1: String,
  race_pos_2: String,
  race_pos_3: String,
  race_fastest_lap: String,
  qualifing_reminder: {
    type: Boolean,
    default: false
  },
  race_reminder: {
    type: Boolean,
    default: false
  }
});

var Prediction = mongoose.model('Prediction', PredictionSchema);

module.exports = {
  Prediction: Prediction
}