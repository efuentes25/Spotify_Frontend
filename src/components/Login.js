import React, { useState } from 'react';
import Navbar from './Nav';
import { redirectSpotifyOAuth } from '../App';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const history = useHistory();

  const inputStyle = {
    border: '1px solid #ced4da',
  };

  const cardStyle = {
    borderRadius: '10px',
  };

  const handleLogin = () => {
    // Check if username and password are not empty
    if (!username.trim() || !password.trim()) {
      // Display an error message
      setErrorMessage('Username and password are required.');
      return;
    }

    // Clear any previous error message
    setErrorMessage('');

    // You can add authentication logic here
    console.log(`Login with ${username} and ${password}`);
    history.push('/');
  };

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      // Display an error message
      setErrorMessage('Username and password are required.');
      return;
    }

    if(username.trim() === 'admin') {
      setErrorMessage('Username already exists');
      return;
    }
    // You can add registration logic here
    console.log(`Register with ${username} and ${password}`);
  };

  const loginToSpotify = () => {
	  redirectSpotifyOAuth();
    console.log('Redirect to Spotify');
  };

  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-5">
            <div className="card bg-dark text-light" style={cardStyle}>
              <div className="card-header text-center">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <form>
                  {/* Username input */}
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      placeholder='Music123'
                      onChange={(e) => setUsername(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  {/* Password input */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      placeholder='password'
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                    />
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                  </div>

                  {/* Login button */}
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>

                  {/* Or divider */}
                  <div className='text-center my-2'><h6>Or</h6></div>

                  {/* Spotify login button */}
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={loginToSpotify}
                    >
                      Login w/ Spotify
                    </button>
                  </div>

                  {/* Register button */}
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
