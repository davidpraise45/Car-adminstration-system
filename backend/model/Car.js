const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Car = new Schema({
  carId: {
    type:String,
    require:true
  },
  make: {
    type: String,
    require: true
  },
  model: {
    type: String
  },
  year: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: String
  }
}, {
  collection: 'car',
  versionKey: false
})

module.exports = mongoose.model('Car', Car)

