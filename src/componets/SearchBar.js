// SearchBar.js - This component will contain the search functionality
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery); // Passes the search query to the parent component
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter music genres (e.g., country, metal, hip hop)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;