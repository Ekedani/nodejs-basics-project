const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShelfSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tags: [{ type: String }],
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'books'
    }
  ]
});

const ShelfModel = mongoose.model('shelves', ShelfSchema);
module.exports = ShelfModel;
