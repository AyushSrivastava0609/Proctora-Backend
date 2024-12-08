const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [
    {
      optionText: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      }
    }
  ],
  correctOption: {
    type: String, 
    required: true
  }
});

const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  testDuration: {
    type: Number, 
    required: true
  },
  startsOn: {
    type: Date,
    required: true
  },
  endsOn: {
    type: Date,
    required: true
  },
  testDescription: {
    type: String,
    required: true
  },
  testType: {
    type: String,
    required: true
  },
  candidateEmails: {
    type: [String],
    required: true
  },
  questions: [questionSchema]
}, { timestamps: true });

const Test = mongoose.model('Tests', testSchema);
module.exports = Test;
