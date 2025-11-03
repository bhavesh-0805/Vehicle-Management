const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  make: String,
  model: String,
  year: Number,
  registrationNumber: String,
  mileage: Number
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
