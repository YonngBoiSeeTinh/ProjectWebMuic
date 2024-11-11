import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForwardFast, faVolumeHigh, faPause } from "@fortawesome/free-solid-svg-icons";
import PlayListSongItem from './PlaylistSongItem';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSong, playSong, pauseSong, setNextSong } from '../../Redux/sliders/songSlide'; 
import { updateUser } from "../../Redux/sliders/userSlide"; 
import SongHistory from '../Songs/SongHistory';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import Ranking from '../home/Ranking';
const PlayListSong = () => { 
    const location = useLocation(); 
    const user = useSelector((state) => state.user);
    const playlist = location?.state?.playlist ?? null;
    const dispatch = useDispatch();
    const { isPlaying } = useSelector(state => state.song); // Lấy trạng thái từ Redux
   
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const seekbarRef = useRef(null);
    const volumnRef = useRef(null);

    const arrSongIn = playlist?.songs || [];
    const [arrSong, setArrSong] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
          try {
            const songDataPromises = arrSongIn.map(async (id) => {
              const res = await axios.get(`http://localhost:3001/api/song/getDetail/${id}`);
              
              return res.data.data; 
            });
           
            const songData = await Promise.all(songDataPromises);
          
            setArrSong(songData);
            
                
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchSongs();
      }, [arrSongIn]);
    
   
    const songPlay = arrSong[currentSongIndex];

    useEffect(() => {
        // Tự động phát bài hát đầu tiên trong playlist khi load
        if (arrSong.length > 0) {
            setPlaySong(0); // Thiết lập bài hát đầu tiên
            dispatch(playSong()); // Chạy hành động phát nhạc
        }
    }, [arrSong]); 

    //Set song khi nhan vao playlistSong
    const setPlaySong = (songIndex) => {
        if (audioRef.current) {
            setCurrentSongIndex(songIndex);
            dispatch(setSong(arrSong[songIndex])); 
          
            audioRef.current.src = arrSong[songIndex].audioFile; 
            audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            dispatch(playSong()); // Chạy hành động phát nhạc
        }
    };
    const songPlays = songPlay?.plays;
    const updatePlays = async (songId) => {
        try {
            await axios.put(`http://localhost:3001/api/song/update/${songId}`,{
                plays:songPlays+1
            });
        } catch (error) {
            console.error('Error updating plays:', error);
        }
    };
    const [userUpdate, setUserUpdate] = useState(user || {})
    const [arrFavorite, setArrFavorite] = useState(userUpdate.songFavorite || [])
    const [isFavorite, setIsFavorite] = useState(false)
    const [arrHistory, setSongHistory] = useState(userUpdate.songHistory || [])
    useEffect(() => {
        setUserUpdate(user);
        setSongHistory(user.songHistory || []);
        setArrFavorite(user.songFavorite || []); 
    }, [user]);
    const handleHistory = async()=>{
        if (!arrHistory.some(s => s === songPlay._id)) {
            const updatedHistory = [...arrHistory, songPlay._id];
            setSongHistory(updatedHistory);      
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, {
                ...user,
                songHistory:updatedHistory
            });   
          
            if (response.data.status === "OK") {
                dispatch(updateUser(userUpdate)); 
            }
        } catch (error) {
            console.error("There was an error update the user!", error);
        }
    }
    } 
    const handelFavorite = async(songId)=>{
        if (!arrFavorite.some(s => s === songId)) {
            const updateFavorite = [...arrFavorite, songId];
            setArrFavorite(updateFavorite);      
            try {
                const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, {
                    ...user,
                    songFavorite:updateFavorite
                });   
            
                if (response.data.status === "OK") {
                    setIsFavorite(true)
                    dispatch(updateUser(userUpdate)); 
                    
                }
            } catch (error) {
                console.error("There was an error update the user!", error);
            }
        }
        else{
            alert("Đã loại hát ra khỏi danh sách yêu thích")
            // Nếu bài hát đã có trong danh sách, loại bỏ ra
            const updateFavorite = arrFavorite.filter(s => s !== songId);
            setArrFavorite(updateFavorite);
            try {
                const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, {
                    ...user,
                    songFavorite: updateFavorite
                });

                if (response.data.status === "OK") {
                    const userUpdate = { ...user, songFavorite: updateFavorite };
                    dispatch(updateUser(userUpdate));
                    setIsFavorite(false)
                }
            } catch (error) {
                console.error("There was an error updating the user!", error);
            }
        }
    } 
    useEffect(() => {
        if (audioRef.current && songPlay) {
            if (audioRef.current.src !== songPlay.audioFile) {
                audioRef.current.src = songPlay.audioFile; // Cập nhật bài hát mới
            }
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            }
        }
    }, [songPlay, isPlaying]);

    useEffect(() => {
        if (isPlaying && songPlay) {
            updatePlays(songPlay._id);
            handleHistory();
        }
    }, [ songPlay]);
    useEffect(() => {
        // Cập nhật isFavorite dựa trên việc kiểm tra xem bài hát hiện tại có trong danh sách yêu thích không
        if (arrFavorite.some(s => s === songPlay?._id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [arrFavorite, songPlay]);
    const togglePlaySong = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                dispatch(pauseSong());
            } else {
                // Kiểm tra nếu bài hát đã có trong audioRef.current
                if (audioRef.current.src === songPlay.audioFile) {
                    audioRef.current.play().catch(error => {
                        console.error('Error playing audio:', error);
                    });
                } else {
                    audioRef.current.src = songPlay.audioFile; // Cập nhật nguồn nếu bài hát khác
                    audioRef.current.play().catch(error => {
                        console.error('Error playing audio:', error);
                    });
                }
                dispatch(playSong());
            }
        }
    };
    
    const playNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % arrSong.length;
        setCurrentSongIndex(nextIndex);
        dispatch(setNextSong(arrSong[nextIndex])); // Cập nhật bài hát mới
    };

    const updateTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            seekbarRef.current.value = audioRef.current.currentTime;
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            seekbarRef.current.max = audioRef.current.duration;
        }
    };

    const onSeekChange = (event) => {
        if (audioRef.current) {
            audioRef.current.currentTime = event.target.value;
            setCurrentTime(event.target.value);
        }
    };

    const onVolumeChange = (event) => {
        if (audioRef.current) {
            audioRef.current.volume = event.target.value / 100;
        }
    };
  const fetchApiUser = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/user/get`);
          
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const queryUser = useQuery({ queryKey: ['user'], queryFn: fetchApiUser });

    const arrUser = queryUser.data ||[]
    const creator = arrUser.filter((item)=>item?._id === playlist?.creator)
    const [seeMore,setSeeMore] = useState(false)
    const handeSeeMore=()=>{
        if(seeMore)
            return "500px"
        else return "250px"
    }
    const handeClickSeeMore=()=>{
        setSeeMore(!seeMore)
    }
    return (
        <div className="song-play_container">
            <div className="left">
                {songPlay ? (
                    <div className="box-playing">
                        <div className="box-play-infor">
                            <div className="song-name">{songPlay?.title}</div>
                            <div className="song-artist">{songPlay?.artist}</div>
                        </div>
                        <div className="box-playing_container">
                            <div></div>
                            <div className="box-img">
                                <img src={songPlay?.coverImage} alt={songPlay?.title} />
                            </div>
                            <input
                                ref={seekbarRef}
                                type="range"
                                min="0"
                                max={duration}
                                step="1"
                                value={currentTime}
                                onChange={onSeekChange}
                                className="box-seekbar"
                            />
                            <div className="box-action">
                                <div className="box-action-left">
                                    <div className="song-action_item" onClick={togglePlaySong}>
                                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                                    </div>
                                    <div className="song-action_item" onClick={playNextSong}>
                                        <FontAwesomeIcon icon={faForwardFast} />
                                    </div>
                                </div>
                                <div className="box-action-right">
                                    <div className="song-action_item">
                                        <div className="render">128kps</div>
                                    </div>
                                    <div className="song-action_item item-volumn">
                                        <FontAwesomeIcon icon={faVolumeHigh} />
                                        <input
                                            ref={volumnRef}
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            onChange={onVolumeChange} 
                                            className="box-volumn"
                                            defaultValue={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <audio
                            ref={audioRef}
                            onTimeUpdate={updateTime}
                            onLoadedMetadata={onLoadedMetadata}
                            onEnded={playNextSong}
                            controls hidden
                        />
                    </div>
                ) : (
                    <div className="box-playing">
                        <h1>Không có bài hát nào được chọn.</h1>
                    </div>
                )}
                   <div className="item creator">Tạo bởi: { creator[0]?.name}</div>
                   <div className="song-play_action" style={{marginTop:"-20px", marginBottom:"20px"}}>
                    <div className="song-play_action-list">
                        <div className="item song_icon"onClick={()=>handelFavorite(songPlay._id)} > 
                            {isFavorite? <FavoriteIcon className='favorite'/>  : <FavoriteBorderIcon/>} 
                        </div>
                        <div className="item song_icon"><DownloadIcon/></div>
                        <div className="item song_icon"><SendIcon/></div>
                      
                    </div>
                </div>
                <div className='song-playlist_list'>
                    {arrSong.map((song, index) => (
                        <PlayListSongItem song={song} key={index} setPlaySong={() => setPlaySong(index)}
                        arrFavorite={arrFavorite} handelFavorite={()=>handelFavorite(song?._id)} />
                    ))}
                </div>
             
                <div className="song-lyrics">
                <h3 className="">Lời bài hát: {songPlay?.title}</h3>   
                    <div className="song-lyrics_infor">     
                        <div className="lyrics" style={{height:handeSeeMore()}}>
                            <p className="lyrics-content"></p>
                        </div>
                        <div className="more-lyrics">
                        <div onClick={handeClickSeeMore}>
                                {seeMore ? "Thu gọn" : "Xem thêm"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="continue-box">
                    <p>NGHE TIẾP</p> 
                    {arrHistory.map((songid, index) => (
                        <SongHistory songid={songid} key ={index} />
                    ))}
                    <Ranking/>
                </div>
            </div>
        </div>
    );
}

export default PlayListSong;
