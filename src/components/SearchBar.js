// SearchBar.js - This component will contain the search functionality
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = () => {

    onSearch(searchQuery); // Passes the search query to the parent component
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Card bg="dark" text="white" className="p-4" style={{ width: '100vh'}}>
            <Card.Body>
              <Card.Title>Search</Card.Title>
              <Form>
                <Form.Group controlId="formSearch">
                  <Form.Control 
                    type="text" 
                    placeholder="Enter music genres (e.g., country, metal, hip hop)" 
                    className="border" 
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleSearch}>
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;