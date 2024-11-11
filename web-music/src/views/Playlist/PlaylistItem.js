import React from "react";
import { Link } from "react-router-dom";

const PlaylistItem = ({ playlist }) => {  // Sử dụng destructuring props
   

    return (
        <div className="topic-item_list">
          
                <Link to={`/playListSong`} state={{ playlist: playlist }}>
                    <div className="topic-item"> 
                        <div className="topic-item-img">
                            <img src={playlist.coverImage} alt={playlist.name} />
                        </div>
                        <div className="topic-item-name">
                            {playlist.name}
                        </div>
                    </div>
                </Link>
         
        </div>
    );
    
};

export default PlaylistItem;
