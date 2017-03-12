var mongoose = require("mongoose");

var RaceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location: String,
  qualifying_start_time: {
    type: Date,
    index: true
  },
  race_start_time: {
    type: Date,
    index: true
  },
  pole: {
    type: String,
    default: null
  },
  race_pos_1: {
    type: String,
    default: null
  },
  race_pos_2: {
    type: String,
    default: null
  },
  race_pos_3: {
    type: String,
    default: null
  }
});

var Race = mongoose.model('Race', RaceSchema);

module.exports = {
  Race: Race
}