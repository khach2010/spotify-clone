import React, { useEffect, useState } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Grid, Slider } from '@material-ui/core';
import { useDataLayerContext } from './DataLayer';
import './Footer.css';

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useDataLayerContext();

  useEffect(() => {
    spotify.getMyCurrentPlayingTrack().then(r => {
      console.log(r);

      dispatch({
        type: 'SET_PLAYING',
        playing: r.is_playing
      });

      dispatch({
        type: 'SET_ITEM',
        item: r.item
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false
      });
    } else {
      spotify.play();
      dispatch({
        type: 'SET_PLAYING',
        playing: true
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then(r => {
      dispatch({
        type: 'SET_ITEM',
        item: r.item
      });
      dispatch({
        type: 'SET_PLAYING',
        playing: true
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then(r => {
      dispatch({
        type: 'SET_ITEM',
        item: r.item
      });
      dispatch({
        type: 'SET_PLAYING',
        playing: true
      });
    });
  };

  return (
    <div className='footer'>
      <div className='footer__left'>
        <img
          className='footer__albumLogo'
          src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440'
          alt='cover-album'
        />
        <div className='footer__songInfo'>
          <h4>No song is PLaying</h4>
          <p>...</p>
        </div>
      </div>
      <div className='footer__center'>
        <ShuffleIcon className='footer__green' />
        <SkipPreviousIcon onClick={skipNext} className='footer__icon' />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className='footer__icon' />
        <RepeatIcon className='footer__green' />
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby='continuous-slider' />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
