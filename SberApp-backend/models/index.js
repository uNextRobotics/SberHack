const mongoose = require("mongoose");
require("dotenv-flow").config();
const URI = process.env.DB_CONN;
const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected!");
};
module.exports = connectDB;

module.exports.Category = require("./category");
module.exports.QA = require("./question");
