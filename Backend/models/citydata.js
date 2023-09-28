const mongoose = require('mongoose');

const weatherSchema =  mongoose.Schema({
    city: String,
    country: String,
    date: String, 
    temperature: Number,
    unit: String,
    humidity: Number,
    windspeed: Number,
    conditions: String,
    icon: String,
    visibility: Number,
    forecast: {
      temperature: {
        min: Number,
        max: Number,
        unit: String,
      },
    },
  });
  
  
  


const CityModel =mongoose.model('Cities', weatherSchema);
module.exports={
    CityModel
    }