/// FILE: src/App.jsx
import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  playPause,
  nextTrack,
  prevTrack,
  setTrack,
  setVolume,
  toggleMute,
  toggleShuffle,
  toggleRepeat,
  toggleTheme
} from './store.js'
import WaveSurfer from 'wavesurfer.js'

export default function App() {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const dispatch = useDispatch()
  const {
    playlist,
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    shuffle,
    repeat,
    theme
  } = useSelector(state => state.player)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (wavesurfer.current) wavesurfer.current.destroy()

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#eee',
      progressColor: '#1db954',
      height: 80,
      responsive: true
    })

    wavesurfer.current.load(playlist[currentTrack].url)
    wavesurfer.current.setVolume(isMuted ? 0 : volume)

    wavesurfer.current.on('ready', () => {
      if (isPlaying) wavesurfer.current.play()
    })

    wavesurfer.current.on('finish', () => {
      if (repeat) {
        wavesurfer.current.play()
      } else {
        dispatch(nextTrack())
      }
    })

    wavesurfer.current.on('seek', () => {
      if (!isPlaying) wavesurfer.current.pause()
    })
  }, [currentTrack])

  useEffect(() => {
    if (!wavesurfer.current) return
    isPlaying ? wavesurfer.current.play() : wavesurfer.current.pause()
  }, [isPlaying])

  useEffect(() => {
    if (!wavesurfer.current) return
    wavesurfer.current.setVolume(isMuted ? 0 : volume)
  }, [volume, isMuted])

  const handlePlayPause = () => dispatch(playPause())

  return (
    <div className="player-container">
      <h1>🎵 Music Player</h1>
      <button onClick={() => dispatch(toggleTheme())} className="theme-btn">
        {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <img
        src={playlist[currentTrack].cover}
        alt="cover"
        className="cover-img"
      />
      <p className="track-title">{playlist[currentTrack].title}</p>
      <p className="track-artist">{playlist[currentTrack].artist}</p>

      <div ref={waveformRef} className="waveform"></div>

      <div className="controls">
        <button onClick={() => dispatch(prevTrack())}>⏮</button>
        <button onClick={handlePlayPause}>{isPlaying ? '⏸' : '▶️'}</button>
        <button onClick={() => dispatch(nextTrack())}>⏭</button>
      </div>

      <div className="volume-controls">
        <label>🔊 Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={e => dispatch(setVolume(parseFloat(e.target.value)))}
        />
        <button onClick={() => dispatch(toggleMute())}>{isMuted ? 'Unmute' : 'Mute'}</button>
      </div>

      <div className="playback-options">
        <button onClick={() => dispatch(toggleShuffle())}>{shuffle ? '🔀 On' : '🔀 Off'}</button>
        <button onClick={() => dispatch(toggleRepeat())}>{repeat ? '🔁 On' : '🔁 Off'}</button>
      </div>

      <div className="playlist">
        <h3>Playlist</h3>
        {playlist.map((track, index) => (
          <div
            key={index}
            className={`track-item ${index === currentTrack ? 'active' : ''}`}
            onClick={() => dispatch(setTrack(index))}
          >
            🎵 {track.title} - {track.artist}
          </div>
        ))}
      </div>
    </div>
  )
}
