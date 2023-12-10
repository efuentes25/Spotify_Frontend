import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PlaylistDisplay from './components/PlaylistDisplay';
import SearchBar from './components/SearchBar';
import MusicApp from './MusicApp';
import Login from './components/Login'
import Play from './components/Play'
import Game from './components/Game'
import AlbumSearch from './AlbumSearch'
import { useEffect, useState } from 'react';

const base_uri = 'http://localhost:3000/';
const spotify_api_client = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID;
const spotify_api_key = process.env.REACT_APP_SPOTIFY_API_CLIENT_KEY;
const redirectUrl = base_uri;
const scope = 'user-read-private user-read-email user-modify-playback-state';

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

const userTokens = {
	get access_token() { return localStorage.getItem('access_token') || null; },
	get refresh_token() { return localStorage.getItem('refresh_token') || null; },
	get expires_in() { return localStorage.getItem('refresh_in') || null },
	get expires() { return localStorage.getItem('expires') || null },

	save: function (res) {
		const { access_token, refresh_token, expires_in } = res;
		localStorage.setItem('access_token', access_token);
		localStorage.setItem('refresh_token', refresh_token);
		localStorage.setItem('expires_in', expires_in);

		const now = new Date();
		const expiry = new Date(now.getTime() + (expires_in * 1000));
		localStorage.setItem('expires', expiry);
	}
};

const args = new URLSearchParams(window.location.search);
const code = args.get('code');

// If we find a code, we're in a callback, do a token exchange
if (code) {
	const token = await accessSpotifyCredentials(code);
	userTokens.save(token);

	// Remove code from URL so we can refresh correctly.
	const url = new URL(window.location.href);
	url.searchParams.delete("code");

	const updatedUrl = url.search ? url.href : url.href.replace('?', '');
	window.history.replaceState({}, document.title, updatedUrl);
}

export async function refreshSpotifyCredentials() {
	const response = await fetch(tokenEndpoint, {
		'method': 'POST',
		'headers': {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: spotify_api_client,
			grant_type: 'refresh_token',
			refresh_token: userTokens.refresh_token
		}),
	});

	return await response.json();
}

export async function redirectSpotifyOAuth() {
	const string_pattern = process.env.REACT_APP_CODE_VERIFIER;
	const hashed_values = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(string_pattern));

	const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed_values)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');

	window.localStorage.setItem('code_verifier', process.env.REACT_APP_CODE_VERIFIER);

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

async function accessSpotifyCredentials(code) {
	const code_verifier = window.localStorage.getItem('code_verifier');
	console.log('checking auth');

	const response = await fetch(tokenEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: spotify_api_client,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: redirectUrl,
			code_verifier: code_verifier,
		}),
	});

	const data = await response.json();

	localStorage.setItem('access_token', data.access_token);
	console.log(data.access_token);
	return data;
}

function App() {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" component={MusicApp} />
						<Route path="/login" component={Login} />
						<Route path="/play" component={Play} />
						<Route path="/game" component={Game} />
						<Route path="/albumSearch" component={AlbumSearch} />
						<Route path="/create" component={Play} />
						<Route render={() => <h1>Page not found</h1>} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
}


export default App;