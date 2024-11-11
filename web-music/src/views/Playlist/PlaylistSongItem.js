import React,{useState, useEffect} from 'react';
import './PlaylistSongitem.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';

const PlayListSongItem = ({song,setPlaySong,arrFavorite,handelFavorite}) => {
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    // Cập nhật isFavorite dựa trên việc kiểm tra xem bài hát hiện tại có trong danh sách yêu thích không
    if (arrFavorite.some(s => s === song?._id)) {
        setIsFavorite(true);
    } else {
        setIsFavorite(false);
    }
}, [arrFavorite]);
  return (
    <>
   
    <div className="message-bar  active" >
            <div className="signal-icon" />
            <span className="nameSong">{song.title}</span>
            <span className="artist">-{song.artist}</span>
            <div className="actions">
              <button className="action-button  song_icon" onClick={setPlaySong}> <FontAwesomeIcon icon={faPlay}/></button>
              <div className="item song_icon"  onClick={handelFavorite}  >
                {isFavorite? <FavoriteIcon className='favorite'/>  : <FavoriteBorderIcon/>} 
              </div>
              <div className="item song_icon"><DownloadIcon/></div>
            </div>
        </div>
  </>  
    
  );
};

export default PlayListSongItem;
