import React from "react";
import { Link } from "react-router-dom";
import './Ranking.scss'
const RankingPLayList =({playlist})=>{

    return(
        <div className="ranking_playlist">
             <Link to={`/playListSong`} state={{ playlist: playlist }}>
                    <div className="ranking_playlist-item"> 
                            <img src={playlist.coverImage} alt={playlist.name} />    
                    </div>
                </Link>
        </div>
    );
}

export default RankingPLayList;