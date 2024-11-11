import { configureStore } from '@reduxjs/toolkit';
import userReducer from './sliders/userSlide'; 
import songReducer from './sliders/songSlide'
const store = configureStore({
  reducer: {
    user: userReducer, // Reducer 
    song: songReducer,
  },
});


export default store;
