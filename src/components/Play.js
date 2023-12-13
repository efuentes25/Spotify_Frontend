import React, { useState } from 'react';
import Navbar from './Nav';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { redirectSpotifyOAuth } from '../App';


function Play() {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('song');
  const isLoginSpotify = window.localStorage.getItem('access_token') !== null;

  const startGame = () => {
    // Passes the choice as a param in the url
    if (selectedOption && isLoginSpotify) {
      history.push(`/game?option=${selectedOption}&login=true`);
    } else {
      // not logged in quiz
      history.push(`/game?option=${selectedOption}&login=false`);
    }
  };

  const loginToSpotify = () => {
    redirectSpotifyOAuth();
  }

  


  return (
    <div>
      <Navbar />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh'}}>
          <Container className='bg-dark py-5 text-light' style={{borderRadius: '20px'}}>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                {isLoginSpotify ? (
                  <h1>Get quizzed on your saved songs</h1>
                ) : (
                  <h3>
                    Get quizzed on USA's Top 10 Songs of the month
                  </h3>
                )}
                
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <Form>
                  <Form.Check
                    type="radio"
                    label="Guess Song"
                    name="playOption"
                    id="playWithSong"
                    onChange={() => setSelectedOption('song')}
                    checked={selectedOption === 'song'}
                  />
                  <Form.Check
                    type="radio"
                    label="Guess Artist"
                    name="playOption"
                    id="playWithArtist"
                    onChange={() => setSelectedOption('artist')}
                    checked={selectedOption === 'artist'}
                  />
                </Form>
              </Col>
            </Row>

            <Row className="justify-content-center mt-3">
              <Col md={8} className="text-center">
                <Button
                  type="button"
                  className="btn btn-success"
                  onClick={startGame}
                >
                  Play
                </Button>
              </Col>
            </Row>
          </Container>
        {!isLoginSpotify ? (
          <div>
            <h3 className='text-center mt-2 text-dark'>or</h3>
          <Container className='bg-dark py-3 text-light mt-0' style={{borderRadius: '20px'}}>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h1>Connect to Spotify to play</h1>
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col md={8} className="text-center">
                <p>
                  Discover how well you know your Spotify saved songs. 
                  The quiz will test your knowledge of artists, song names, 
                  and more from your personal Spotify library.
                </p>
              </Col>
            </Row>

            <Row className="justify-content-center mt-3">
              <Col md={8} className="text-center">
                <Button
                  type="button"
                  className="btn btn-success"
                  onClick={loginToSpotify}
                >
                  Spotify Login
                </Button>
              </Col>
            </Row>
          </Container>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Play;
