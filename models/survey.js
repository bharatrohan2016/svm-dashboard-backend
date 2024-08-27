const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
    trim: true
  },
  excel_id: {
    type: String
  },
  farmer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer2024'
  },
  survey_date: {
    type: Date,
  },
  map_link: {
    type : String
  },
  advisory: {
    type: String
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create the Farmer2024 Model
const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;