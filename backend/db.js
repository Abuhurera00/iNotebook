const mongoose = require("mongoose");
require('dotenv').config()
const mongoURI = process.env.MONGO_URL;

// console.log("mongoURI")

 function connectToMongo() {
    mongoose.connect(mongoURI).then(()=>console.log("Connected to mongo successfully")).catch((e)=>console.log(e.message))
  }
  
  module.exports = connectToMongo;

  // mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4