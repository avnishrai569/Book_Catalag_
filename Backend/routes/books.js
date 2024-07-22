const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, author, description } = req.body;

  try {
    const newBook = new Book({ title, author, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const books = await Book.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { author: new RegExp(query, 'i') }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
