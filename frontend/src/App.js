import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import FavoriteBooks from './components/FavoriteBooks';
import BookForm from './components/BookForm';
import './App.css';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const App = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search`, {
        params: { query }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleAddFavorite = async (bookId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/favorites', { bookId });
      if (response.status === 200) {
        const favoriteBook = books.find((book) => book._id === bookId);
        setFavorites([...favorites, favoriteBook]);
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const handleSubmitBook = async (book) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', book);
      if (response.status === 201) {
        setBooks([...books, response.data]);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Book Catalog</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <SearchBar onSearch={handleSearch} />
        <div className="main-content">
          <div className="book-list">
            <BookList books={books} onAddFavorite={handleAddFavorite} />
          </div>
          <div className="favorite-books">
            <FavoriteBooks favorites={favorites} />
          </div>
        </div>
        <BookForm onSubmit={handleSubmitBook} />
      </Container>
    </div>
  );
};

export default App;
