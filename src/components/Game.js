import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Image, ProgressBar } from 'react-bootstrap';
import Navbar from './Nav';
import { useHistory } from 'react-router-dom';

const mockData = {
  song: [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', imageUrl: 'https://www.udiscovermusic.com/wp-content/uploads/2019/11/The-Weekend-2019-press-shot-CREDIT-Republic-Records-1000.jpg' },
    { id: 2, title: 'One Dance', artist: 'Drake', imageUrl: 'https://cdns-images.dzcdn.net/images/cover/56bdb7a86a27fadb96332c0c8f1b8e81/350x350.jpg' },
    { id: 3, title: 'Zeze', artist: 'Kodak Black', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273f9508eb3070b95ceeb82788b' },
    { id: 4, title: 'Meltdown', artist: 'Travis Scott', imageUrl: 'https://e.snmc.io/i/600/s/a2a1d67a19226c89a9d24040cd81442f/11194507/travis-scott-meltdown-Cover-Art.jpg' },
    { id: 5, title: 'Ball w/o You', artist: '21 Savage', imageUrl: 'https://images.genius.com/91e9a63e8c1b5798dc9b7ba1bb5c70be.220x220x1.jpg' },
  ],
  artist: [
    { id: 1, title: 'The Weeknd', song: 'Blinding Lights', imageUrl: 'https://www.udiscovermusic.com/wp-content/uploads/2019/11/The-Weekend-2019-press-shot-CREDIT-Republic-Records-1000.jpg' },
    { id: 2, title: 'Drake', song: 'One Dance', imageUrl: 'https://cdns-images.dzcdn.net/images/cover/56bdb7a86a27fadb96332c0c8f1b8e81/350x350.jpg' },
    { id: 3, title: 'Kodak Black', song: 'Zeze', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273f9508eb3070b95ceeb82788b' },
    { id: 4, title: 'Travis Scott', song: 'Meltdown', imageUrl: 'https://e.snmc.io/i/600/s/a2a1d67a19226c89a9d24040cd81442f/11194507/travis-scott-meltdown-Cover-Art.jpg' },
    { id: 5, title: '21 Savage', song: 'Ball w/o You', imageUrl: 'https://images.genius.com/91e9a63e8c1b5798dc9b7ba1bb5c70be.220x220x1.jpg' },
  ],
};

const shuffleArray = (array, correctAnswer) => {
  const choices = array
    .filter(option => option.title !== correctAnswer) // Exclude correct answer
    .sort(() => Math.random() - 0.5) // Shuffle remaining choices
    .slice(0, 2); // Select 2 random choices

  // Include correct answer at a random position
  const randomIndex = Math.floor(Math.random() * 3);
  choices.splice(randomIndex, 0, { title: correctAnswer });

  return choices;
};

function Game() {
  const location = useLocation();
  const history = useHistory();

  const selectedOption = new URLSearchParams(location.search).get('option');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answerConfirmed, setAnswerConfirmed] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const currentQuestion = mockData[selectedOption][currentQuestionIndex];
    // Shuffle choices when the question changes
    setShuffledChoices(shuffleArray(mockData[selectedOption], currentQuestion.title));
  }, [currentQuestionIndex, selectedOption]);

  const currentQuestion = mockData[selectedOption][currentQuestionIndex];

  const handleAnswer = (optionTitle) => {
    setSelectedAnswer(optionTitle);
  };

  const handleConfirm = () => {
    const correctAnswer = currentQuestion.title;
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setScore(score + (correct ? 1 : 0));
    setAnswerConfirmed(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockData[selectedOption].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setAnswerConfirmed(false);
    } else {
      // All questions have been completed
      setQuizCompleted(true);
    }
  };

  const handleBackToPlay = () => {
    history.push('/play');
  };


  return (
    <div id='backgroundQuiz'>
      <Navbar />
      <Container>
        {quizCompleted ? (
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="mt-3">
                <h3>Quiz Completed!</h3>
                <h1>Your final score is: {score}/{mockData[selectedOption].length}</h1>
                <Button variant="primary" onClick={handleBackToPlay}>
                  Back to Play
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="text-center">
                {currentQuestion.imageUrl && (
                  <Image src={currentQuestion.imageUrl} alt={`Image for ${currentQuestion.title}`} fluid style={{height: '300px'}}/>
                )}
                <p className='pt-1'>{selectedOption === 'artist' ? `Who sings the song "${currentQuestion.song}"?` : `Which song is this?`}</p>
                <ListGroup>
                  {shuffledChoices.map((option) => (
                    <ListGroup.Item key={option.title}>
                      <Button
                        variant={
                          answerConfirmed
                            ? isCorrect && selectedAnswer === option.title
                              ? 'success'
                              : !isCorrect && selectedAnswer === option.title
                              ? 'danger'
                              : 'outline-primary'
                            : selectedAnswer === option.title
                            ? 'primary'
                            : 'outline-primary'
                        }
                        onClick={() => handleAnswer(option.title)}
                        className="w-100"
                        disabled={answerConfirmed}
                      >
                        {option.title}
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <ProgressBar
                  now={(currentQuestionIndex / mockData[selectedOption].length) * 100}
                  className="mt-3"
                  style={{ backgroundColor: 'white' }}
                />
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
        )}
      </Container>
    </div>
  );
}

export default Game;
