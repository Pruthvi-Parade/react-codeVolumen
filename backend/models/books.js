const autoIncrement = require('mongoose-auto-increment');

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true }, 
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, unique: true },
  quantity: { type: Number, default: 1 }, 
  genres: [String],
  excerpt: { type: String, required: true },
});

bookSchema.plugin(autoIncrement.plugin, { model: 'Book', field: 'bookId' });



 module.exports = mongoose.model('Book', bookSchema);