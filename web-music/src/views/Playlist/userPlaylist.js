import React from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserPlaylist =({playlist})=> { 
    const navigate = useNavigate();  

    const handelClickPlaylist = () => {
        navigate('/playlistSong', { state: { playlist } }); 
    }

        return (
            
                 <div className="playlist" onClick={handelClickPlaylist}>
                    <div className="playlist_box">
                        <img src = {playlist.coverImage}  className="playlist_img"/>
                    </div>
                    <p>{playlist.name}</p>
                </div>
          
        );
    
}

export default UserPlaylist;
