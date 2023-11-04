const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Book = require('../models/books');

// User signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    res.status(201).json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    else{
      res.json({ message: 'User login successful', username: user.username });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

  // Add a book
  router.post('/add-book', async (req, res) => {
    try {
      const { title, author, quantity, summary, excerpt } = req.body;
  
      // Create a new book using the Book model
      const newBook = new Book({
        title,
        author,
        quantity,
        summary,
        excerpt,
      });
  
      // Save the new book to the database
      const savedBook = await newBook.save();
  
      res.status(201).json({ message: 'Book added successfully', book: savedBook });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add book', error: error.message });
    }
  });

module.exports = router;
