import React, { useEffect, useState } from "react";
import './userPage.scss';
import { logout } from "../../Service/UserService";
import { resetUser, updateUser } from "../../Redux/sliders/userSlide"; 
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import  UserPlaylist from  '../Playlist/userPlaylist'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SongItem from "../Playlist/SongItems";
import FavoriteIcon from '@mui/icons-material/Favorite';

function UserPage ({setIsSignIn}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const [arrFavorite, setArrFavorite] = useState(user.songFavorite ? user.songFavorite :[])
    const [arrSongFavorite,setArrSongFavorite] =([]);
    const handleLogOut =async()=>{
        await logout();
        dispatch(resetUser());
        setIsSignIn(false);
        navigate('/');
    }

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
    const arrPlaylist = queryData.filter(playlist => playlist.creator === user.id) || [];

    const fetchApiSong = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/get`);
          
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
  
    const querySong = useQuery({ queryKey: ['songs'], queryFn: fetchApiSong });
    const queryDataSong= querySong.data || [];
    const arrSong = queryDataSong.filter((item)=> item?.creator === user.id && item.isAccept) 
  
    const fetchFavoriteSongs = async () => {
        if (arrFavorite.length > 0) {
                try {
                  const songDataPromises = arrFavorite.map(async (id) => {
                    const res = await axios.get(`http://localhost:3001/api/song/getDetail/${id}`);
                    
                    return res.data.data; 
                  });
                 
                  const songData = await Promise.all(songDataPromises);
                  console.log('songData',songData);
                  setArrSongFavorite(songData);
                  
                      
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
        
    };}
    
    // Gọi hàm fetch khi click vào playlist
    const handelClickPlaylist = () => {
        fetchFavoriteSongs();
        console.log(arrSongFavorite); 
        //navigate('/favoritePlaylist', { state: { arrSongFavorite } }); 
    };
     

    return(
        <div className="profile_contaier">
            <div className="profile_infor-box"  style={{
                    backgroundImage: `url('https://i.pinimg.com/736x/a7/9f/80/a79f80e0653102f7d073c97a6fa28393.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', 
                }}>
                    <img className="profile_avatart" src={user?.avatar || ""} />
                    <div className="profile_infor">
                        <h1>Trang cá nhân</h1>
                        <div className="profile_infor-item">Tên : {user.name || "Chưa có thông tin"}</div>
                        <div className="profile_infor-item">Giới tính: {user?.sex || "Chưa có thông tin"}</div>
                        <div className="profile_infor-item">Sinh nhật:{user?.birthday || "Chưa có thông tin"}</div>
                        <div className="profile_infor-item">Tiểu sử: {user?.introduce || "Chưa có thông tin"}</div>
                        <div className="profile_infor-item">Thành viên: {user?.isVip ? "Vip": "Thường"}</div>
                        <Link to ="/upvip">
                         <button className="upVip">Nâng cấp thành viên Vip</button>
                        </Link>
                       
                        
                        <button className="logOut" onClick={handleLogOut}>Đăng xuất</button>
                    </div>
            </div>
            <div className="profile_action-button">
                    <Link to = '/updateProfile'>
                    <button className="updateProfile">Chỉnh sửa</button>
                    </Link>
               
                    <Link to = '/createPlaylist'>
                        <button className="createPlaylist" >Tạo playlist</button>
                    </Link>
            </div>        
                <h2 className="Playlist-album_title">PLAYLIST | ALBUMN {">"} </h2>
            <div className="profile-action_box">       
                <div className="Playlist-Albumn-box">
                    <div className="playlist" onClick={handelClickPlaylist}>
                            <div className="playlist_box favorite">
                                        <FavoriteIcon className="favorite_icon"/>
                            </div>                
                            <p>Bài hát yêu thích</p>
                    </div>
                    {arrPlaylist.map((playlist,index)=>(
                        <UserPlaylist playlist = {playlist} key={index}></UserPlaylist>
                    ))}
                </div>
                <div className="song_list">
                    <h2>Danh sách bài hát</h2>
                    {arrSong.map((song, index) => (
                        <SongItem song={song} key={index} />
                    ))}
                </div>
            </div>
            

        </div>
    )

}

export default UserPage;