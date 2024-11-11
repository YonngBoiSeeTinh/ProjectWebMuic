import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { setSong } from '../../Redux/sliders/songSlide'; 


const AddSongItem = ({song,setArrSongPlaylist,arrSongPlaylist}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Hàm xử lý khi nhấn nút phát bài hát
  
  const handleSongClick = (song) => {
      const originalSong = song.song || song; // Use the nested song if it exists, otherwise use the passed song
      console.log('songInFuncion', originalSong); // Logs the correct song object
      localStorage.setItem('currentSong', JSON.stringify(originalSong));
      localStorage.setItem('isPlaying', true);
      dispatch(setSong(originalSong)); // Dispatch action to update the playing song
      navigate(`/song_play/${originalSong._id}`);
  };
  const handleAddSong = () => {
    if (!arrSongPlaylist.some(s => s === song._id)) {
      setArrSongPlaylist(prevArr => [
        ...prevArr,
        song._id
      ]);
      console.log(song);
    } else {
      alert('Bài hát đã có trong danh sách');
    }
  };
  
  return (
  
    <div className="add_song ">
            <span className="nameSong">{song.title}</span>
            <span className="artist">-{song.artist}</span>
            <div className="actions">
            <button className="pause" onClick={() => handleSongClick(song)}>
                <FontAwesomeIcon icon={faPlay}/>
              </button>
              <button className="action-button add" onClick={handleAddSong}>Thêm</button>
             
            </div>
        </div>
    
  );
};

export default AddSongItem;
