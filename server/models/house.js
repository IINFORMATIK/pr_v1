const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  street: String,
  houseNumber: Number,
  floors: Number,
  entrances: Number,
  material: String,
  overlapping: String,
  roof: String,
  gasification: Boolean,
  fireWaterSupply: Boolean,
});

module.exports = mongoose.model('House', houseSchema);
