import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav'
import { Container, Row, Col, Card, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import App from './App';


const spotify_api_client = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID;
const spotify_api_key = process.env.REACT_APP_SPOTIFY_API_CLIENT_KEY;
const tokenEndpoint = "https://accounts.spotify.com/api/token";

function AlbumSearch(){
  //const [searchResults, setSearchResults] = useState([]);
  //const [isPlaylistVisible, setPlaylistVisibility] = useState(false);

  // const searchPlaylists = (genres) => {
  //   // Implement the logic to fetch playlists based on the genres entered.
  //   // Dummy data for demonstration purposes.
  //   // setSearchResults([
  //   //   { id: 1, name: 'Country Hits' },
  //   //   { id: 2, name: 'Metal Madness' },
  //   //   { id: 3, name: 'Hip Hop Heat' },
  //   // ]);

  //   // Update the visibility state to true when search results are available.
  //   setPlaylistVisibility(true);
  // };

  const [searchQuery, setSearchQuery] = useState('');
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

	useEffect(() => {
		// access API Token
		setAccessToken(window.localStorage.getItem('access_token'));
	}, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  async function search(){
    console.log("Search for " + searchQuery);
    // Get a request for the artist id
    var searchParm = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=artist', searchParm)
      .then(response => response.json())
      .then(data => { 
        console.log(data);
        return data.artists.items[0].id 
      });

    console.log("artist id is " + artistID);

    // get all albumns for artis
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParm)
    .then(response => response.json())
    .then(data => { 
      console.log(data); 
      setAlbums(data.items);
    });
    // display all
  }

  return (
    <div>
      <Navbar />
      <div className="text-center p-4"> {/* Center the content */}
        <h1>Music Album Search</h1>
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            <Col>
              <Card bg="dark" text="white" className="p-4" style={{ width: '100vh' }}>
                <Card.Body>
                  <Card.Title>Search</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formSearch">
                      <Form.Control
                        type="input"
                        placeholder="Enter Artist Name Here"
                        className="border"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="success" onClick={search}>
                      Search
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="mx-2 row row-cols-4">
            {albums.map((album, i) => (
              <Col key={i} className="mb-4 d-flex align-items-center justify-content-center">
                <Card bg="dark" text="white" className="p-2" style={{ width: '300px', borderRadius: '10px', textAlign: 'center' }}>
                  <Card.Img src={album.images[0].url} className="album-image" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AlbumSearch;
