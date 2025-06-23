const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  city: String,
  picture: String,
});

module.exports = mongoose.model("User", userSchema);