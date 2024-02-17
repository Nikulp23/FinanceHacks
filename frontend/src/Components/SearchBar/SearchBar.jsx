// SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Type your message here..." />
      <button type="submit">Send</button>
    </div>
  );
}

export default SearchBar;
