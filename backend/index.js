const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

app.use(cors());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
  
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Set up your routes here
const userRoutes = require('./routes/userRoutes');
const librarianRoutes = require('./routes/librarianRoutes');
// const commonRoutes = require('./routes/commonRoutes');

app.use('/api/user', userRoutes);
app.use('/api/librarian', librarianRoutes);
// app.use('/api/common', commonRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
