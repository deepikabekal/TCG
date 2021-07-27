const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const artSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  medium: {
    type: String
  },
  price: {
    type: String,
    require: true,
    min: 0.99
  },
  dimensions: {
    type: String,
    required: true
  },
  // placeholder until we establish how we're doing images. This is how it was done in shop-shop module 22.
  image: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  vote: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }]
});

const Art = model('Art', artSchema);

module.exports = Art;

