import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCopy } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  //
import { setSong } from '../../Redux/sliders/songSlide'; 

const RankingSong = ({ arrSong }) => {  
    
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng
    const dispatch = useDispatch();  // Dùng để dispatch action

    const handleSongClick = (song) => {
        localStorage.setItem('currentSong', JSON.stringify(song)); 
        localStorage.setItem('isPlaying', true);
        dispatch(setSong(song));  // Dispatch action playSong để cập nhật bài hát đang phát
        navigate(`/song_play/${song._id}`);  
        
    };

    return (
        <>
        {arrSong.map((song, index)=>(
            <div key={song.id} className="song-items">
                <div className="rank"> {index + 1} </div> {/* Thứ hạng dựa vào index */}
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
                    <div className="song-action_item"><FontAwesomeIcon icon={faPlay} onClick={() => handleSongClick(song)}/></div>
                    <div className="song-action_item"><FontAwesomeIcon icon={faHeart} /></div>
                    <div className="song-action_item"><FontAwesomeIcon icon={faCopy} /></div>
                </div>
            </div>
        ))}
        </>   
    );
}

export default RankingSong;
