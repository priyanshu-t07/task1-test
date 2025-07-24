/// FILE: src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTrack: 0,
  isPlaying: false,
  volume: 1,
  isMuted: false,
  shuffle: false,
  repeat: false,
  theme: 'dark',
  playlist: [
    {
      title: 'Track 1',
      artist: 'Artist A',
      url: '/music/song1.mp3',
      cover: '/covers/cover1.jpg'
    },
    {
      title: 'Track 2',
      artist: 'Artist B',
      url: '/music/song2.mp3',
      cover: '/covers/cover2.jpg'
    }
  ]
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause(state) {
      state.isPlaying = !state.isPlaying
    },
    setTrack(state, action) {
      state.currentTrack = action.payload
      state.isPlaying = true
    },
    nextTrack(state) {
      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.playlist.length)
        state.currentTrack = randomIndex
      } else {
        state.currentTrack = (state.currentTrack + 1) % state.playlist.length
      }
    },
    prevTrack(state) {
      state.currentTrack = (state.currentTrack - 1 + state.playlist.length) % state.playlist.length
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    }
  }
})

export const {
  playPause,
  setTrack,
  nextTrack,
  prevTrack,
  setVolume,
  toggleMute,
  toggleShuffle,
  toggleRepeat,
  toggleTheme
} = playerSlice.actions

export const store = configureStore({ reducer: { player: playerSlice.reducer } })