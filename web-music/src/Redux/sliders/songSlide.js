import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.currentSong = action.payload;  // Cập nhật bài hát
    },
    playSong: (state) => {
      state.isPlaying = true;  // Phát nhạc
    },
    pauseSong: (state) => {
      state.isPlaying = false;  // Tạm dừng nhạc
    },
    resumeSong: (state) => {
      state.isPlaying = true;  // Tiếp tục phát nhạc
    },
    setNextSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;  // Cập nhật bài hát mới và phát nhạc
    },
  },
});

export const { setSong, playSong, pauseSong, resumeSong, setNextSong } = songSlice.actions;
export default songSlice.reducer;
