const mongoose = require("mongoose");

const UserMove = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyCode:{
    type: String,
    required: true, 
  },
  dateRangeOne: {
    type: Number,
    required: true,
  },
  dateRangeTwo: {
    type: Number,
    required: true,
  }
  
});

const Log = mongoose.model("UserMove", UserMove);

module.exports = { Log };