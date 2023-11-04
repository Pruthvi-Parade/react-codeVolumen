const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Book = require('../models/books');

  // Route to get all books
  router.get('/all-books', async (req, res) => {
    try {
      const allBooks = await Book.find();
      res.status(200).json(allBooks);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
  });
  
module.exports = router;