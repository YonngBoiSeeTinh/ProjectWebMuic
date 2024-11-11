import React from "react";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  //
import { setSong } from '../../Redux/sliders/songSlide'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import HistoryIcon from '@mui/icons-material/History';
const SongItem = ({ songid }) => {  
    
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng
    const dispatch = useDispatch();  // Dùng để dispatch action

  

    const fetchApiSong = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/song/getDetail/${songid}`);
          return res.data.data; 
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
      const querySong = useQuery({ queryKey: ['song', songid], queryFn: fetchApiSong });
      const song = querySong.data || null;

      const handleSongClick = (song) => {
        localStorage.setItem('currentSong', JSON.stringify(song)); 
        localStorage.setItem('isPlaying', true);
        dispatch(setSong(song));  // Dispatch action playSong để cập nhật bài hát đang phát
        navigate(`/song_play/${song._id}`);  
        
    };

    return (
        <div>
            <div className="song_history">
                <HistoryIcon className="icon"/>
                <div className="song song-infor" onClick={() => handleSongClick(song)}>
                    <div className="song song-infor_name">{song?.title}</div>
                    <div className="song song-infor_artist">{song?.artist}</div>
                </div> 
            </div>
        </div>
    );
}

export default SongItem;
