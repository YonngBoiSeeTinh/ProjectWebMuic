import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  //
import { setSong } from '../../Redux/sliders/songSlide'; 

const Ranking = ({arrSong, country})=>{
   
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng
    const dispatch = useDispatch();  // Dùng để dispatch action

    const handleSongClick = (song) => {
        localStorage.setItem('currentSong', JSON.stringify(song)); 
        localStorage.setItem('isPlaying', true);
        dispatch(setSong(song));  // Dispatch action playSong để cập nhật bài hát đang phát
        navigate(`/song_play/${song._id}`);  
        
    };
    console.log(country);
    let arrSongFilter =[]
    if(country){
       arrSongFilter = arrSong.filter((item)=>item.country === country)
    }
    return (
            <div className="ranking" style={{width:"100%" }}>
                {arrSongFilter.map((song, index)=>(
                    <div key={song.id} className="song-items" style={{margin:"20px 0px"}}>
                        <h2 className="rank"> {index + 1} </h2> {/* Thứ hạng dựa vào index */}
                        <div className="song song-infor" onClick={() => handleSongClick(song)}>
                            <div className="song song-infor_name">{song.title}</div>
                            <div className="song song-infor_artist">{song.artist}</div>
                        </div> 
                    </div>
                ))}
            </div>
    );
   
}

export default Ranking;
