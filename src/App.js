import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PlaylistDisplay from './components/PlaylistDisplay';
import SearchBar from './components/SearchBar';
import MusicApp from './MusicApp';

const base_uri = 'http://localhost:3000';
const spotify_api_client = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID;
const redirectUrl = `${base_uri}`;
const scope = 'user-read-private user-read-email';

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

const userTokens = {
	get accessToken() { fetch(`${base_uri}/somethingsomething`).then(data => { return data.json() }) },
	get refreshToken() { fetch(`${base_uri}/somethingsomethingelse`).then(data => { return data.json() }) }
	// todo expires_in field
	// todo expires field
	// todo setters for above
};

async function redirectSpotifyOAuth() {
	const string_pattern = process.env.REACT_APP_CODE_VERIFIER;
	const hashed_values = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(string_pattern));

	const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed_values)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');

	window.localStorage.setItem('react_code_challenge', code_challenge_base64);

	const auth_uri = new URL(authorizationEndpoint);
	const param = {
		response_type: 'code',
		client_id: spotify_api_client,
		scope: scope,
		code_challenge_method: 'S256',
		code_challenge: code_challenge_base64,
		redirect_uri: redirectUrl,
	}

	auth_uri.search = new URLSearchParams(param).toString();
	window.location.href = auth_uri.toString(); // redirects to spotify auth server for login
}

function App() {
	// redirectSpotifyOAuth();
	// console.log(spotify_api_client);

	return (
		<div>
			<MusicApp />
		</div>
	);
}


export default App;