const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

let favorites = [];

const mongoose = require('mongoose');

mongoose.set('strictQuery', false); 

mongoose.connect('mongodb://localhost:27017/bookcatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


router.post('/', async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    favorites.push(book);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(favorites);
});

module.exports = router;
