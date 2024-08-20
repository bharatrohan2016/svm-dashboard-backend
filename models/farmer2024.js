const mongoose = require('mongoose');

const Farmer2024Schema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
    trim: true
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
  },
  id: {
    type: String
  },
  village: {
    type: String,
    trim: true
  },
  block: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  postalCode: {
    type: String
  },
  crops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop'
  }]
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create the Farmer2024 Model
const Farmer2024 = mongoose.model('Farmer2024', Farmer2024Schema);

module.exports = Farmer2024;