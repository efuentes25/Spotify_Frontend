// PlaylistDisplay.js - This component will display the playlists based on the search
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PlaylistDisplay = ({ playlists, isVisible }) => {
  if (!isVisible) {
    return null; // Return null to render nothing when not visible
  }
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card bg="dark" text="white" className="p-4" style={{ width: '100%' }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title>Playlists</Card.Title>
              <ul className="list-unstyled">
                {playlists.map((playlist) => (
                  <li key={playlist.id} className="mb-2">
                    <Button variant="outline-light" onClick={() => console.log(`Clicked playlist: ${playlist.name}`)}>
                      {playlist.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    // <div>
    //   <h2>Playlists:</h2>
    //   <ul>
    //     {playlists.map((playlist) => (
    //       <li key={playlist.id}>
    //         <button onClick={() => console.log(`Clicked playlist: ${playlist.name}`)}>
    //           {playlist.name}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default PlaylistDisplay;