import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from './spotify';
import { useDataLayerContext } from './DataLayer';
import './App.css';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerContext();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      });

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user
        });
      });

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists
        });
      });
    }
  }, []);

  return (
    <div className='app'>
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
