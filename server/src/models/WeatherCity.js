const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeatherCitySchema = new Schema({
  name: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model('WeatherCity', WeatherCitySchema);