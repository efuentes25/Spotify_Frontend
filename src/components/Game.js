import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Image, ProgressBar, Modal } from 'react-bootstrap';
import Navbar from './Nav';
import { useHistory } from 'react-router-dom';

let trackData = {
  song: [
    {id: 0, title: 'Santa Tell Me', artist: 'Ariana Grande', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a1db745e63940bc06985dea5', preview: 'https://www.youtube.com/embed/nlR0MkrRklg?si=JHpKAybWlz2D6EsI'},
    {id: 1, title: "It's Beginning to Look a Lot like Christmas", artist: 'Michael Bublé', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732ead7786631d8dd3b59be4f0', preview: 'https://www.youtube.com/embed/KmddeUJJEuU?si=BSaBAopKxSE1xzGF'},
    {id: 2, title: 'Let It Snow! Let It Snow! Let It Snow!', artist: 'Dean Martin', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2736d88028a85c771f37374c8ea', preview: 'https://www.youtube.com/embed/Rnil5LyK_B0?si=YklkkHNYECUp-UPf'},
    {id: 3, title: 'A Holly Jolly Christmas', artist: 'Burl Ives', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273efe2a536761d4f8e8401ae62', preview: 'https://www.youtube.com/embed/e_AMTbO50vU?si=OPfZHQ4euhuLdNhn'},
    {id: 4, title: 'Lovin On Me', artist: 'Jack Harlow', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273fcf4adae77baba5d0169e8e8', preview: 'https://www.youtube.com/embed/Iq8h3GEe22o?si=qzZ700qt0Drsbc3V'},
    {id: 5, title: 'Last Christmas - Single Version', artist: 'Wham!', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734b68569ae3fdd6fcd0f98615', preview: 'https://www.youtube.com/embed/UOCJBYTrRFM?si=mT5pCvUyAVzP_KcB'},
    {id: 6, title: "It's the Most Wonderful Time of the Year", artist: 'Andy Williams', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273585897779cf3591ba0f07650', preview: 'https://www.youtube.com/embed/AN_R4pR1hck?si=h26a2bNAsVCeT62a'},
    {id: 7, title: 'All I Want for Christmas Is You', artist: 'Mariah Carey', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734246e3158421f5abb75abc4f', preview: 'https://www.youtube.com/embed/aAkMkVFwAoo?si=A_GWkjMYkFFy2CPg'},
    {id: 8, title: 'Jingle Bell Rock', artist: 'Bobby Helms', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273fd56f3c7a294f5cfe51c7b17', preview: 'https://www.youtube.com/embed/ZnDmmiiFSUU?si=CGgTrbK0IHPJ_7hC'},
    {id: 9, title: "Rockin' Around The Christmas Tree", artist: 'Brenda Lee', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737845f74d6db14b400fa61cd3', preview: 'https://www.youtube.com/embed/TFsZy9t-qDc?si=g13HQDMI_4pmZHYv'}
  ],
  artist: [
    {id: 0, title: 'Ariana Grande', song: 'Santa Tell Me', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a1db745e63940bc06985dea5', preview: 'https://www.youtube.com/embed/nlR0MkrRklg?si=JHpKAybWlz2D6EsI'},
    {id: 1, title: 'Michael Bublé', song: "It's Beginning to Look a Lot like Christmas", imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732ead7786631d8dd3b59be4f0', preview: 'https://www.youtube.com/embed/KmddeUJJEuU?si=BSaBAopKxSE1xzGF'},
    {id: 2, title: 'Dean Martin', song: 'Let It Snow! Let It Snow! Let It Snow!', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2736d88028a85c771f37374c8ea', preview: 'https://www.youtube.com/embed/Rnil5LyK_B0?si=YklkkHNYECUp-UPf'},
    {id: 3, title: 'Burl Ives', song: 'A Holly Jolly Christmas', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273efe2a536761d4f8e8401ae62', preview: 'https://www.youtube.com/embed/e_AMTbO50vU?si=OPfZHQ4euhuLdNhn'}, 
    {id: 4, title: 'Jack Harlow', song: 'Lovin On Me', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273fcf4adae77baba5d0169e8e8', preview: 'https://www.youtube.com/embed/Iq8h3GEe22o?si=qzZ700qt0Drsbc3V'},
    {id: 5, title: 'Wham!', song: 'Last Christmas - Single Version', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734b68569ae3fdd6fcd0f98615', preview: 'https://www.youtube.com/embed/UOCJBYTrRFM?si=mT5pCvUyAVzP_KcB'},
    {id: 6, title: 'Andy Williams', song: "It's the Most Wonderful Time of the Year", imageUrl: 'https://i.scdn.co/image/ab67616d0000b273585897779cf3591ba0f07650', preview: 'https://www.youtube.com/embed/AN_R4pR1hck?si=h26a2bNAsVCeT62a'},
    {id: 7, title: 'Mariah Carey', song: 'All I Want for Christmas Is You', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734246e3158421f5abb75abc4f', preview: 'https://www.youtube.com/embed/aAkMkVFwAoo?si=A_GWkjMYkFFy2CPg'},
    {id: 8, title: 'Bobby Helms', song: 'Jingle Bell Rock', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273fd56f3c7a294f5cfe51c7b17', preview: 'https://www.youtube.com/embed/ZnDmmiiFSUU?si=CGgTrbK0IHPJ_7hC'},
    {id: 9, title: 'Brenda Lee', song: "Rockin' Around The Christmas Tree", imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737845f74d6db14b400fa61cd3', preview: 'https://www.youtube.com/embed/TFsZy9t-qDc?si=g13HQDMI_4pmZHYv'}
  ],
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
  const isLoggedIn = new URLSearchParams(location.search).get('login');
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
  const [isImageBlurred, setIsImageBlurred] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    if(isLoggedIn === "false") {
      setLoaded(true);
    }
  }, [setLoaded, isLoggedIn]);

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

    trackData = {
      song: [],
      artist: [],
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
      // resets music
      if (videoRef.current) {
        videoRef.current.src = currentQuestion.preview;
        videoRef.current.load();
      }
    }
  }, [currentQuestionIndex, selectedOption, isLoaded]);

  let currentQuestion

  if(isLoaded) {
    currentQuestion = trackData[selectedOption][currentQuestionIndex];
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
    setIsImageBlurred(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < trackData[selectedOption].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setAnswerConfirmed(false);
      handleImageClick();
    } else {
      // All questions have been completed
      setQuizCompleted(true);
    }
  };

  const handleBackToPlay = () => {
    history.push('/play');
  };

  const handleImageClick = () => {
    if (!answerConfirmed && isImageBlurred) {
      handleShowModal();
    } else {
      setIsImageBlurred(!isImageBlurred);
    }
  };

  const handleConfirmReveal = () => {
    // Close the modal
    handleCloseModal();
  
    if (!answerConfirmed) {
      setIsImageBlurred(!isImageBlurred);
      setAnswerConfirmed(true);
      const correctAnswer = currentQuestion.title;
      setSelectedAnswer(correctAnswer);
      setIsCorrect(false);
    }
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
                    <div
                      style={{ position: 'relative' }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={currentQuestion.imageUrl}
                        alt={`Image for ${currentQuestion.title}`}
                        fluid
                        style={{ height: '300px', filter: isImageBlurred ? 'blur(5px)' : 'none', cursor: 'pointer' }}
                        onClick={handleImageClick}
                      />
                      {hovered && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px' }}>
                          Reveal Image
                        </div>
                      )}
                    </div>
                  )}
                  {currentQuestion.preview && isLoggedIn === 'true' ? (
                    <video ref={videoRef} controls autoPlay name='media' allowFullScreen={false} controlsList="nodownload" style={{ height: '75px', width: '100%'}}>
                      <source src={currentQuestion.preview} type="audio/mpeg"></source>
                    </video>
                  ) : (
                    <iframe
                      width="300"
                      height="240"
                      src={currentQuestion.preview}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                      allowFullScreen
                    ></iframe>
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

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reveal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reveal the image? Its going to count as a incorrect question.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmReveal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      </div> 
    ) : (
      <p>Loading...</p>
    )
  );
}

export default Game;
