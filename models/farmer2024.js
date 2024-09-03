const mongoose = require('mongoose');

const Farmer2024Schema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
    trim: true
  },
  // fatherName: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  phoneNumber: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: Date,
  },
  excel_id: {
    type: String,
    unique: true
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
  }],
  feild_number: {
    type: String,
  },
  area: {
      type: String,
  },
  // geometry: {
  //     type: String
  // },
  long: {
      type: Number,
  },
  lat: {
      type: Number,
  },
  survey: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey'
    }
  ],
  maps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Maps'
    }
  ]
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create the Farmer2024 Model
const Farmer2024 = mongoose.model('Farmer2024', Farmer2024Schema);

module.exports = Farmer2024;