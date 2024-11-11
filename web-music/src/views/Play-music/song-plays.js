import React, { useState, useRef, useEffect } from 'react';
import './song-play.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVolumeHigh, faPause } from "@fortawesome/free-solid-svg-icons";
import SongPlayItem from './song-play_item';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, pauseSong, setSong } from '../../Redux/sliders/songSlide';
import Ranking from '../home/Ranking';
import { updateUser } from "../../Redux/sliders/userSlide"; 
import SongHistory from '../Songs/SongHistory';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
const SongPlay = () => {
   
    const dispatch = useDispatch();
    const audioRef = useRef(null); // Tạo ref cho phần tử audio
    const songPlay = useSelector(state => state.song.currentSong); // Lấy bài hát đang phát từ Redux
    const isPlaying = useSelector(state => state.song.isPlaying); // Trạng thái đang phát từ Redux
    const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại của bài hát
    const [duration, setDuration] = useState(0); // Tổng thời gian của bài hát
    const seekbarRef = useRef(null); // Tạo ref cho thanh seekbar
    const volumnRef = useRef(null);
    const user = useSelector((state) => state.user);
    // Khôi phục bài hát và trạng thái phát nhạc từ localStorage
    useEffect(() => {
        const savedSong = JSON.parse(localStorage.getItem('currentSong'));
        const savedIsPlaying = JSON.parse(localStorage.getItem('isPlaying'));

        if (savedSong) {
            dispatch(setSong(savedSong));  // Khôi phục bài hát từ localStorage
            
            if (savedIsPlaying) {
                dispatch(playSong());  // Phát nhạc nếu isPlaying là true
            }
        }
    }, [dispatch]);

    const [seeMore,setSeeMore] = useState(false)
    const handeSeeMore=()=>{
        if(seeMore)
            return "500px"
        else return "250px"
    }
    const handeClickSeeMore=()=>{
        setSeeMore(!seeMore)
    }
     // API để lấy danh sách bài hát
    const fetchApiSong = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/get`);
            return res.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const querySong = useQuery({ queryKey: ['playlist'], queryFn: fetchApiSong });
    const querySongData = querySong.data || [];
    const arrSong = querySongData.filter((item)=>item.isAccept)
  
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
   
    const [arrHistory, setSongHistory] = useState(userUpdate.songHistory || [])
    const [arrFavorite, setArrFavorite] = useState(userUpdate.songFavorite || [])
    const [isFavorite, setIsFavorite] = useState(false)
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
    // Xử lý khi bài hát thay đổi 
    useEffect(() => {
        if (audioRef.current && songPlay) {
            const audio = audioRef.current;
            audio.pause(); 
            audio.src = songPlay.audioFile;
            audio.load(); 
            audio.currentTime = 0; 
            if (isPlaying) {
                audio.play().catch(error => {
                    console.log("Error playing audio:", error);
                });
            }
        }
    }, [songPlay]);
    useEffect(() => {
        // Cập nhật isFavorite dựa trên việc kiểm tra xem bài hát hiện tại có trong danh sách yêu thích không
        if (arrFavorite.some(s => s === songPlay._id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [arrFavorite, songPlay]);
    useEffect(() => {
        if (isPlaying && songPlay) {
            updatePlays(songPlay._id);
            handleHistory();
            
        }
    }, [songPlay]);
    

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause(); // Dừng nhạc
                dispatch(pauseSong()); // Dispatch action tạm dừng
            } else {
                // Khi phát nhạc lại, tiếp tục từ thời điểm hiện tại
                audioRef.current.play(); // Phát nhạc
                dispatch(playSong()); // Dispatch action phát nhạc
            }
        }
    };
    

    // Cập nhật thời gian hiện tại của bài hát và thanh seekbar
    const updateTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            seekbarRef.current.value = audioRef.current.currentTime;
        }
    };

    // Khi audio đã sẵn sàng, cập nhật tổng thời gian và seekbar
    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            seekbarRef.current.max = audioRef.current.duration;
        }
    };

    // Khi người dùng kéo thanh seekbar, thay đổi thời gian phát nhạc
    const onSeekChange = (event) => {
        if (audioRef.current) {
            audioRef.current.currentTime = event.target.value;
            setCurrentTime(event.target.value);
        }
    };

    // Thay đổi âm lượng
    const onVolumeChange = (event) => {
        if (audioRef.current) {
            audioRef.current.volume = event.target.value / 100;
        }
    };
   const [linkShare, setLinkShare] = useState("")
    return (
        <div className="song-play_container">
            <div className="left">
                {songPlay ? (
                    <div className="box-playing">
                        <div className="box-play-infor">
                            <div className="song-name">{songPlay?.title} - </div>
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
                                id='seekbar'
                                className="box-seekbar"
                            />

                            <div className="box-action">
                                <div className="box-action-left">
                                    <div className="song-action_item" onClick={handlePlayPause}>
                                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                                    </div>
                                </div>
                                <div className="box-action-right ">
                                    <div className="song-action_item">
                                        <div className="render">128kps</div>
                                    </div>
                                    <div className="song-action_item item-volumn">
                                        <FontAwesomeIcon icon={faVolumeHigh} />
                                        <input
                                            id='volumnChange'
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
                        {/* Phần tử audio để phát nhạc */}
                        <audio
                            ref={audioRef}
                            onTimeUpdate={updateTime}
                            onLoadedMetadata={onLoadedMetadata}
                            onEnded={() => {
                                setCurrentTime(0);  // Đặt thời gian về 0
                                audioRef.current.play(); // Phát lại bài hát khi kết thúc
                            }}
                            controls hidden
                        />
                    </div>
                ) : (
                    <div className="box-playing">
                        <h1>Không có bài hát nào được chọn.</h1>
                    </div>
                )}

                <div className="song-play_action">
                    <div className="song-play_action-list" >
                        <div className="item song_icon"onClick={()=>handelFavorite(songPlay._id)} > 
                            {isFavorite? <FavoriteIcon className='favorite'/>  : <FavoriteBorderIcon/>} 
                        </div>
                        <div className="item song_icon"><DownloadIcon/></div>
                        <div className="item song_icon"><SendIcon/></div>
                      
                    </div>
                </div>
                <div className="song-lyrics" >
                <h3 className="">Lời bài hát: {songPlay?.title}</h3> 
                    <div className="song-lyrics_infor">
                       
                        <div className="lyrics" style={{height:handeSeeMore()}}>
                            <p className="lyrics-content" ></p>
                        </div>
                        <div className="more-lyrics">
                             <div onClick={handeClickSeeMore}>
                                {seeMore ? "Thu gọn" : "Xem thêm"}
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className='song-playlist_list'>
                <h2>BÀI HÁT HOT NHẤT</h2>
                    {arrSong.map((song, index) => (
                        <SongPlayItem song={song} key={index} arrFavorite={arrFavorite} handelFavorite={()=>handelFavorite(song._id)}/>
                    ))}
                </div>
            </div>

            <div className="right">
                <div className="continue-box">
                    <p>NGHE TIẾP</p>
                    {arrHistory.map((songid, index) => (
                        <SongHistory songid={songid} key ={index} />
                    ))}
                    <Ranking style={{with:"600px"}}/>
                </div>
            </div>
        </div>
    );
}

export default SongPlay;
