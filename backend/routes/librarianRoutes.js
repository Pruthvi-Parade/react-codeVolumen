const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Librarian = require('../models/librarian');
const Book = require('../models/books');

// Librarian signup
router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const librarian = await Librarian.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ librarian });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Librarian login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const librarian = await Librarian.findOne({ email });
      if (!librarian) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, librarian.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      console.log("Hit");
      res.json({ message: 'Librarian login successful', username: librarian.username });    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Update Book
  router.put('/update-book/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      const updatedBook = req.body; // Contains the updated book details
  
      const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

  // Delete Book
  router.delete('/delete-book/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
  });

module.exports = router;