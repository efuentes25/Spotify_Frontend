import React from 'react';
import Navbar from './components/Nav';
import { useHistory } from 'react-router-dom';

const MusicApp = () => {
  const history = useHistory();

  const backgroundSavedSongs = {
    backgroundImage: 'url("https://cdn.create.vista.com/api/media/small/347767565/stock-photo-top-view-paper-cut-notes-music-book-acoustic-guitar-white")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '94vh',
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  };

  const backgroundCreateQuiz = {
    backgroundImage: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3cd770b2-3e49-4672-99fb-8483b9dd9bf0/dg2k29u-9851dd8a-8d2d-4553-a05f-735162de949e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNjZDc3MGIyLTNlNDktNDY3Mi05OWZiLTg0ODNiOWRkOWJmMFwvZGcyazI5dS05ODUxZGQ4YS04ZDJkLTQ1NTMtYTA1Zi03MzUxNjJkZTk0OWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hZ6ZwpZvpCu60uiGP0wRAm3XKBr4iRmdzTQhpg6doqk")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '93vh',
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  };

  const containerStyle = {
    color: 'white',
  };

  const cardStyle = {
    maxWidth: '800px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto', // Center horizontally
    marginTop: '10px', // Adjust the top margin
    padding: '50px'
  };

  const textContainerStyle = {
    flex: 1,
    padding: '20px',
  };

  const imageContainerStyle = {
    flex: 1,
    minHeight: '300px',
  };

  return (
    <div>
      <Navbar />

      {/* Spotify Saved Songs Section */}
      <div className="container-fluid" style={backgroundSavedSongs}>
        <div className="d-flex align-items-center justify-content-center" style={containerStyle}>
          <div className="card text-center" style={cardStyle}>
            {/* Text container on the left */}
            <div style={textContainerStyle}>
              <div className="card-body">
                <h2 className="card-title">Spotify Saved Songs Quiz</h2>
                <p className="card-text">
                  Discover how well you know your Spotify saved songs. The quiz will
                  test your knowledge of artists, song names, and more from your
                  personal Spotify library.
                </p>
                <button className="btn btn-success" onClick={() => {history.push('/play')}}>Play Now</button>
              </div>
            </div>

            {/* Image container on the right */}
            <div style={imageContainerStyle}>
              <img
                src={require('./Images/music-932097_1920.jpg')}
                alt=''
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Create Quiz Section */}
      <div className="container-fluid" style={backgroundCreateQuiz}>
        <div className="d-flex align-items-center justify-content-center" style={containerStyle}>
          <div className="card text-center" style={cardStyle}>
            {/* Text container on the left */}
            <div style={textContainerStyle}>
              <div className="card-body">
                <h2 className="card-title">Search Albums</h2>
                <p className="card-text">
                  Want to search up your favorite albums? With our app, you can easily
                  find albums based on your favorite artists and genres.
                </p>
                <button className="btn btn-primary" onClick={() => {history.push('/albumSearch')}}>Search</button>
              </div>
            </div>

            {/* Image container on the right */}
            <div style={imageContainerStyle}>
              <img
                src={require('./Images/searchImage.png')}
                alt=''
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
