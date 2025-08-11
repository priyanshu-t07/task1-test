/* FILE: src/App.jsx */
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
import EnhancedAnimatedBackground from './components/EnhancedAnimatedBackground'

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
      waveColor: theme === 'dark' ? '#bbb' : '#444',
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
      repeat ? wavesurfer.current.play() : dispatch(nextTrack())
    })

    wavesurfer.current.on('seek', () => {
      if (!isPlaying) wavesurfer.current.pause()
    })
  }, [currentTrack, theme])

  useEffect(() => {
    if (!wavesurfer.current) return
    isPlaying ? wavesurfer.current.play() : wavesurfer.current.pause()
  }, [isPlaying])

  useEffect(() => {
    if (!wavesurfer.current) return
    wavesurfer.current.setVolume(isMuted ? 0 : volume)
  }, [volume, isMuted])

  return (
    <>
      {/* Animated Background */}
      <EnhancedAnimatedBackground
        isPlaying={isPlaying}
        volume={volume}
        theme={theme}
        waveColor="#1db954"
      />

      {/* Music Player Box */}
      <div className="centered-player glass-card">
        <h1>🎵 Music Player</h1>
        <button className="theme-btn" onClick={() => dispatch(toggleTheme())}>
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Cover Art */}
        <img src={playlist[currentTrack].cover} alt="cover" className="cover-img" />

        {/* Track Details */}
        <p className="track-title">{playlist[currentTrack].title}</p>
        <p className="track-artist">{playlist[currentTrack].artist}</p>

        {/* Waveform */}
        <div ref={waveformRef} className="waveform"></div>

        {/* Controls */}
        <div className="controls">
          <button onClick={() => dispatch(prevTrack())}>⏮</button>
          <button onClick={() => dispatch(playPause())}>
            {isPlaying ? '⏸' : '▶️'}
          </button>
          <button onClick={() => dispatch(nextTrack())}>⏭</button>
        </div>

        {/* Volume */}
        <div className="volume-controls">
          <label>🔊</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={e => dispatch(setVolume(parseFloat(e.target.value)))}
          />
          <button onClick={() => dispatch(toggleMute())}>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>

        {/* Shuffle & Repeat */}
        <div className="playback-options">
          <button onClick={() => dispatch(toggleShuffle())}>
            {shuffle ? '🔀 On' : '🔀 Off'}
          </button>
          <button onClick={() => dispatch(toggleRepeat())}>
            {repeat ? '🔁 On' : '🔁 Off'}
          </button>
        </div>

        {/* Playlist */}
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
    </>
  )
}
