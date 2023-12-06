import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Image, ProgressBar } from 'react-bootstrap';
import Navbar from './Nav';

const mockData = {
  song: [
    { id: 1, title: 'Meowsicle', artist: 'Tom Cat', imageUrl: 'https://placekitten.com/200/200', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: '9 Lives', artist: 'Garfield', imageUrl: 'https://placekitten.com/200/200', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    // Add more song data as needed
  ],
  artist: [
    { id: 1, title: 'Tom Cat', song: 'Meowsicle', imageUrl: 'https://placekitten.com/200/200', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Garfield', song: '9 Lives', imageUrl: 'https://placekitten.com/200/200', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    // Add more artist data as needed
  ],
};

function Game() {
  const location = useLocation();
  // gets the params from the URL: Artist or Song
  const selectedOption = new URLSearchParams(location.search).get('option');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answerConfirmed, setAnswerConfirmed] = useState(false);

  const currentQuestion = mockData[selectedOption][currentQuestionIndex];

  const handleAnswer = (optionTitle) => {
    setSelectedAnswer(optionTitle);
  };

  const handleConfirm = () => {
    const correctAnswer = selectedOption === 'song' ? currentQuestion.artist : currentQuestion.title;
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setScore(score + (correct ? 1 : 0));
    setAnswerConfirmed(true);
  };

  const handleNext = () => {
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null); // Reset selected answer for the new question
    setIsCorrect(null); // Reset correctness for the new question
    setAnswerConfirmed(false); // Reset answer confirmation state
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8} className="text-center">
            <h1>Guess the {selectedOption}</h1>
            <p>Score: {score}</p>
          </Col>
        </Row>
        {/* Maps the questions */}
        {currentQuestionIndex < mockData[selectedOption].length ? (
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="mt-3 text-center">
                {currentQuestion.imageUrl && (
                  <Image src={currentQuestion.imageUrl} alt={`Image for ${currentQuestion.title}`} fluid />
                )}
                {currentQuestion.audioUrl && (
                  <div className="mt-2">
                    <audio controls>
                      <source src={currentQuestion.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                )}
                {/* Logic for the quiz questions */}
                <p>{selectedOption === 'artist' ? `Who sings the song "${currentQuestion.song}"?` : `Which song is this?`}</p>
                <ListGroup>
                  {mockData[selectedOption].map((option) => (
                    <ListGroup.Item key={option.id}>
                       <Button
                            variant={
                                answerConfirmed
                                ? isCorrect && selectedAnswer === option.title
                                    ? 'success'
                                    : !isCorrect && selectedAnswer === option.title
                                    ? 'danger'
                                    : 'outline-primary'
                                : selectedAnswer === option.title
                                ? 'primary' // Change color to primary only for the selected button when not confirmed
                                : 'outline-primary'
                            }
                            onClick={() => handleAnswer(option.title)}
                            className="w-100" // Make the button fill the width
                            disabled={answerConfirmed} // Disable buttons after confirming
                            >
                            {option.title}
                        </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                {/* Progress Bar that shows how many questions have been done and are needed */}
                <ProgressBar now={(currentQuestionIndex / mockData[selectedOption].length) * 100} className="mt-3" />
                {selectedAnswer !== null && !answerConfirmed && (
                  <div className="mt-3">
                    <Button variant="primary" onClick={handleConfirm} className="mr-2">
                      Confirm
                    </Button>
                  </div>
                )}
                {answerConfirmed && (
                  <div className="mt-3">
                    <Button variant="primary" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        //   When the quiz is done this would appear on the screen
        ) : (
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="mt-3">
                <h3>Quiz Completed!</h3>
                <p>Your final score is: {score}</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Game;
