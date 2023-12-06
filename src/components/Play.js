import React, { useState } from 'react';
import Navbar from './Nav';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Play() {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('song');

  const startGame = () => {
    // Passes the choice as a param in the url
    if (selectedOption) {
      history.push(`/game?option=${selectedOption}`);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
        <Container className='bg-dark py-5 text-light'>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1>Get quizzed on your songs</h1>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <p>
              </p>
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
      </div>
    </div>
  );
}

export default Play;
