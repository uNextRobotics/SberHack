const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
});

const catModel = mongoose.model("Category", Category);

module.exports = catModel;
