const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number
});

module.exports = mongoose.model('Cat', catSchema);
