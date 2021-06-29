const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Buyer = new Schema({
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  personId: {
    type: String,
    require: true
  },
  occupation: {
    type: String,
    require: true
  },
  houseaddress: {
    type: String,
    require: true
  },
  phonenumber: {
    type: String,
    require: true
  },
  carId: [

  ]
}, {
  collection: 'buyer',
  versionKey: false
})

module.exports = mongoose.model('Buyer', Buyer)

