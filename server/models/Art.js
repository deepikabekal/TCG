const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    type: Number,
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
  voteCount: {
    type: Number,
    default: 0
  },
  vote: [{
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;