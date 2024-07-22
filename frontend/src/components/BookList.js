
import React from 'react';
import './BookList.css'; 

const BookList = ({ books, onAddFavorite }) => {
  return (
    <div className="book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div key={book._id} className="book-item">
              <h3>{book.title}</h3>
              <button onClick={() => onAddFavorite(book._id)}>Add to Favorites</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
