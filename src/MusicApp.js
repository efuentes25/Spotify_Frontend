// MusicApp.js - This is the main parent component that holds SearchBar and PlaylistDisplay
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PlaylistDisplay from './components/PlaylistDisplay';

const MusicApp = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchPlaylists = (genres) => {
    // implement the logic to fetch playlists based on the genres entered
    // dummy data
    setSearchResults([
      { id: 1, name: 'Country Hits' },
      { id: 2, name: 'Metal Madness' },
      { id: 3, name: 'Hip Hop Heat' },
    ]);
  };

  return (
    <div>
      <h1>Music Playlist Search</h1>
      <SearchBar onSearch={searchPlaylists} />
      <PlaylistDisplay playlists={searchResults} />
    </div>
  );
};

export default MusicApp;