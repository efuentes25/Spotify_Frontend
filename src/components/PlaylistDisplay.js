// PlaylistDisplay.js - This component will display the playlists based on the search
import React from 'react';

const PlaylistDisplay = ({ playlists }) => {
  return (
    <div>
      <h2>Playlists:</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <button onClick={() => console.log(`Clicked playlist: ${playlist.name}`)}>
              {playlist.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDisplay;