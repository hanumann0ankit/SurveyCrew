const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [String], 
      type: {
        type: String,
        enum: ['text', 'multiple-choice'],
        required: true,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey