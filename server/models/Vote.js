const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  art: {
    type: Schema.Type.ObjectId,
    ref: 'Art'
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;