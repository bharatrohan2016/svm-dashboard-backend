const mongoose = require('mongoose');

// Define the Crop Schema
const CropSchema = new mongoose.Schema({
  cropName: {
    type: String,
    trim: true
  },
  variety: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  season: {
    type: String,
    enum: ['Kharif', 'Rabi', 'Zaid', 'Other'],
    trim: true
  },
  ownedLand: {
    type: Number,
    min: [0, 'Owned land area cannot be negative'],  // Owned land area in acres
  },
  leasedLand: {
    type: Number,
    min: [0, 'Leased land area cannot be negative'],  // Leased land area in acres
  },
  dateOfSowing: {
    type: Date,
  },
  dateOfHarvest: {
    type: Date,
    // validate: {
    //   validator: function(v) {
    //     return v >= this.dateOfSowing;  // Harvest date should be after sowing date
    //   },
    //   message: 'Harvest date must be after the sowing date!'
    // }
  },
  fertilizersApplied: {
    type: [String],  // Array of strings representing fertilizers
    default: []
  },
  pesticidesApplied: {
    type: [String],  // Array of strings representing pesticides
    default: []
  },
  yieldPerAcre: {
    type: Number,
    required: true,
    min: [0, 'Yield per acre cannot be negative'],  // Yield in some unit (e.g., quintals per acre)
  },
  cropassurefarmer : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer2024'
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create the Crop Model
const Crop = mongoose.model('Crop', CropSchema);

module.exports = Crop;