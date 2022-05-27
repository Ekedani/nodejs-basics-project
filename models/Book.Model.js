const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const BookModel = mongoose.model('book', BookSchema);
module.exports = BookModel;
