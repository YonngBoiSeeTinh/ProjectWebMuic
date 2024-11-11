import React from "react";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  //
import { setSong } from '../../Redux/sliders/songSlide'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';

const SongItem = ({ song }) => {  
    
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng
    const dispatch = useDispatch();  // Dùng để dispatch action

    const handleSongClick = (song) => {
        localStorage.setItem('currentSong', JSON.stringify(song)); 
        localStorage.setItem('isPlaying', true);
        dispatch(setSong(song));  // Dispatch action playSong để cập nhật bài hát đang phát
        navigate(`/song_play/${song._id}`);     
    };

    return (
        <div>
            <div key={song.id} className="song-items">
                <img className="song song-img" src={song.coverImage} alt={song.title} />
                <div className="song song-infor" onClick={() => handleSongClick(song)}>
                    <div className="song song-infor_name">{song.title}</div>
                    <div className="song song-infor_artist">{song.artist}</div>
                </div>
                <div className="song-mark">
                    <span className="icon-tag-official" title="Bản Chính Thức">Official</span>
                    <span className="icon-tag-hd" title="High Quality (Chất Lượng Cao)">HQ</span>
                </div>
                <div className="song-action">
                  
                    <div className="item song_icon"><FavoriteBorderIcon/></div>
                    <div className="item song_icon"><DownloadIcon/></div>
                </div>
            </div>
        </div>
    );
}

export default SongItem;
