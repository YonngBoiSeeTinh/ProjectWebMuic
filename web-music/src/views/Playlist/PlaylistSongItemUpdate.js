import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { setSong } from '../../Redux/sliders/songSlide'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const SongItem = ({ songid,handleDeleteSong }) => {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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

    // Hàm xử lý khi nhấn nút phát bài hát
    
    const handleSongClick = (song) => {
        const originalSong = song.song || song; // Use the nested song if it exists, otherwise use the passed song
        console.log('songInFuncion', originalSong); // Logs the correct song object
        localStorage.setItem('currentSong', JSON.stringify(originalSong));
        localStorage.setItem('isPlaying', true);
        dispatch(setSong(originalSong)); // Dispatch action to update the playing song
        navigate(`/song_play/${originalSong._id}`);
    };
    if (querySong.isLoading) return <div>Loading...</div>;
    if (querySong.isError || !song) return <div>Error loading song</div>;
    return (
        <div className="message-bar" >
            <div className="signal-icon" />
            <span className="nameSong">{song?.title}</span>
            <span className="artist">-{song?.artist}</span>
            <div className="actions">
              <button className="pause" onClick={() => handleSongClick(song)}>
                <FontAwesomeIcon icon={faPlay}/>
              </button>
             
              <button className="delete" onClick={()=>handleDeleteSong(song._id)}>Xóa</button>
            </div>
        </div>
    );
};

export default SongItem;
