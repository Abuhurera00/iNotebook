const mongoose = require("mongoose");
require('dotenv').config()
const mongoURI = process.env.MONGO_URL;

// console.log("mongoURI")

const connectToMongo = async () => {
  mongoose.connection.on('connected', () => console.log("Database Connected"))

  await mongoose.connect(`${mongoURI}/maidlife`)
}

module.exports = connectToMongo;

// mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4