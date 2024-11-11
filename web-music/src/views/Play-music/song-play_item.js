import React,{useEffect,useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { setSong } from '../../Redux/sliders/songSlide'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';

const SongPlayItem = ({song,arrFavorite,handelFavorite}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false)
  // Hàm xử lý khi nhấn nút phát bài hát
     useEffect(() => {
        // Cập nhật isFavorite dựa trên việc kiểm tra xem bài hát hiện tại có trong danh sách yêu thích không
        if (arrFavorite.some(s => s === song._id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [arrFavorite]);
  const handleSongClick = (song) => {
      const originalSong = song.song || song; // Use the nested song if it exists, otherwise use the passed song
      console.log('songInFuncion', originalSong); // Logs the correct song object
      localStorage.setItem('currentSong', JSON.stringify(originalSong));
      localStorage.setItem('isPlaying', true);
      dispatch(setSong(originalSong)); // Dispatch action to update the playing song
      navigate(`/song_play/${originalSong._id}`);
  };
  return (
    <>
   
    <div className="message-bar  active" >
            <div className="signal-icon" />
            <span className="nameSong">{song.title}</span>
            <span className="artist">-{song.artist}</span>
            <div className="actions">
              <button className="action-button  song_icon" > <FontAwesomeIcon icon={faPlay}/></button>
              <div className="item song_icon"onClick={handelFavorite} > 
                            {isFavorite? <FavoriteIcon className='favorite'/>  : <FavoriteBorderIcon/>} 
                </div>
              <div className="item song_icon"><DownloadIcon/></div>
            </div>
        </div>
  </>  
    
  );
};

export default SongPlayItem;
