const mongoose = require("mongoose");
const QA = new mongoose.Schema({
  Category: {
    type: String,
    unique: true,
    required: true,
  },
  Question: {
    type: String,
    required: true,
  },
  CorrectAnswer: {
    type: String,
    required: true,
  },
  Answers:{
    type: Array,
    required: true
  }
});
const QAModel = mongoose.model("QA", QA);

module.exports = QAModel;
