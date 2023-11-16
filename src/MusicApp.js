import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PlaylistDisplay from './components/PlaylistDisplay';

const MusicApp = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaylistVisible, setPlaylistVisibility] = useState(false);

  const searchPlaylists = (genres) => {
    // Implement the logic to fetch playlists based on the genres entered.
    // Dummy data for demonstration purposes.
    setSearchResults([
      { id: 1, name: 'Country Hits' },
      { id: 2, name: 'Metal Madness' },
      { id: 3, name: 'Hip Hop Heat' },
    ]);

    // Update the visibility state to true when search results are available.
    setPlaylistVisibility(true);
  };

  return (
    <div className="text-center p-4"> {/* Center the content */}
      <h1>Music Playlist Search</h1>
      <SearchBar onSearch={searchPlaylists} />
      <PlaylistDisplay playlists={searchResults} isVisible={isPlaylistVisible} />
    </div>
  );
};

export default MusicApp;
