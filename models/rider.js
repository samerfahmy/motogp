var mongoose = require("mongoose");

var RiderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    index: true
  },
  team: String,
  manufacturer: String,
  number: String
});

var Rider = mongoose.model('Rider', RiderSchema);

module.exports = {
  Rider: Rider
}