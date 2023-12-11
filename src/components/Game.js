import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Image, ProgressBar } from 'react-bootstrap';
import Navbar from './Nav';
import { useHistory } from 'react-router-dom';

const trackData = {
  song: [],
  artist: [],
}

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
  const [accessToken, setAccessToken] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // access API Token
    const token = window.localStorage.getItem('access_token');
    setAccessToken(token);
  }, []);

  useEffect(() => {
    // Call the search function only if accessToken is available
    if (accessToken) {
      search();
    }
  }, [accessToken]);


	async function search() {
    try {
      var searchParm = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      };
  
      var tracks = await fetch('https://api.spotify.com/v1/me/tracks?offset=0&limit=10&locale=en-US,en;q=0.9', searchParm);
  
      if (!tracks.ok) {
        throw new Error(`HTTP error! Status: ${tracks.status}`);
      }
  
      var data = await tracks.json();
      //console.log(data.items);
      populateQuiz(data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function populateQuiz(tracks) {
    if(tracks.length === 0) {
      // NO TRACKS
      return
    }

    tracks.forEach((track, i) => {
      var title = track.track.name;
      var artist = track.track.album.artists[0].name
      var thumbnail = track.track.album.images[0].url
      var songPreview = track.track.preview_url

      trackData.song.push({ id: i, title: title, artist: artist, imageUrl: thumbnail, preview: songPreview})
      trackData.artist.push({ id: i, title: artist, song: title, imageUrl: thumbnail, preview: songPreview})

    })

    setLoaded(true);
  }
   

  useEffect(() => {
    if(isLoaded) {
      const currentQuestion = trackData[selectedOption][currentQuestionIndex];
      // Shuffle choices when the question changes
      setShuffledChoices(shuffleArray(trackData[selectedOption], currentQuestion.title));
    }
  }, [currentQuestionIndex, selectedOption, isLoaded]);

  let currentQuestion

  if(isLoaded) {
    currentQuestion = trackData[selectedOption][currentQuestionIndex];
    // resets music
    if (videoRef.current) {
      videoRef.current.src = currentQuestion.preview;
      videoRef.current.load();
    }
  }

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
    if (currentQuestionIndex < trackData[selectedOption].length - 1) {
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

  const totalQuestions = trackData[selectedOption].length;

  return (
    isLoaded ? (
      <div id='backgroundQuiz'>
        <Navbar />
        <Container>
          {quizCompleted ? (
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <div className="mt-3">
                  <h3>Quiz Completed!</h3>
                  <h1>Your final score is: {score}/{totalQuestions}</h1>
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
                    <Image src={currentQuestion.imageUrl} alt={`Image for ${currentQuestion.title}`} fluid style={{ height: '300px' }} />
                  )}
                  {currentQuestion.imageUrl && (
                    <video ref={videoRef} controls autoPlay name='media' allowFullScreen={false} controlsList="nodownload" style={{ height: '75px', width: '100%'}}>
                      <source src={currentQuestion.preview} type="audio/mpeg"></source>
                    </video>
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
                    now={(currentQuestionIndex / totalQuestions) * 100}
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

                  {/* Display Current Question Index */}
                  <div className="mt-3">
                    <p>Question {currentQuestionIndex + 1}/{totalQuestions}</p>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div> 
    ) : (
      <p>Loading...</p>
    )
  );
}

export default Game;
