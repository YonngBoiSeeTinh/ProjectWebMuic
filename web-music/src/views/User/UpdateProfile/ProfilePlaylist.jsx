import React,{useState} from "react";
import { resetUser, updateUser } from "../../../Redux/sliders/userSlide"; 
import { useLocation , Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


function ProfilePlaylist (){   
    const user = useSelector((state) => state.user)
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/playlist/get`);  
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const query = useQuery({ queryKey: ['playlists'], queryFn: fetchApi });
    const queryData = query.data || []
    const arrPlaylist = queryData.filter(playlist => playlist?.creator === user?.id) || [];
    console.log(arrPlaylist);
    return(
       <div className="playlist">
           <h2>Quản lý Playlist</h2>
           
           <Link to = '/createPlaylist'>
                <button className="createPlaylist" >Tạo playlist</button>
            </Link>
            <div className="playlist_list">
                {
                    arrPlaylist.map((playlist, index) => (
                        <div className="playlist_item">
                            <img src={playlist.coverImage}></img>
                                <div className="playlist_name">
                                    <div> {playlist.name} </div> 
                                    <p>Đang cập nhật</p> 
                                </div>
                                <div className="playlist_action">
                                    <button>Xóa</button>
                                    <Link to = '/updatePlaylist' state={playlist={playlist}} >
                                        <button className="update">Cập nhật</button>
                                    </Link>
                                  
                                </div>
                            
                        </div>
                    ))
                }
            </div>
       </div>
    )

}

export default ProfilePlaylist;