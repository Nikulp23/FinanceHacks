// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendClick = () => {
    onSend(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="search-bar">
      <input 
        type="text"
        placeholder="Type your message here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button type="button" onClick={handleSendClick}>Send</button>    </div>
  );
}

export default SearchBar;
