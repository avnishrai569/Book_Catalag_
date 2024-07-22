import React from 'react';

const FavoriteBooks = ({ favorites }) => {
  return (
    <div>
      <h2>Favorite Books</h2>
      <ul>
        {favorites.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteBooks;
