var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    index: true
  },
  password: String,
  name: String,
  test: {
  	type: Boolean,
  	default: false
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}