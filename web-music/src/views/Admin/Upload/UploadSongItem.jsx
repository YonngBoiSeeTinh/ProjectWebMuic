import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PauseIcon from '@mui/icons-material/Pause';
import { Link } from "react-router-dom";
import axios from "axios";


const SongItem = ({ song,setCopyrightInfo,setShowModal }) => {  
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại của bài hát
    const [duration, setDuration] = useState(0); // Tổng thời gian của bài hát
    const seekbarRef = useRef(null); // Tạo ref cho thanh seekbar
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleSongClick = () => {
        setIsPlaying(!isPlaying); 
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
     // Gọi API kiểm tra bản quyền
    const checkCopyright = async () => {
        try {
        const audioFileUrl = audioRef.current.src;  // Lấy URL của file nhạc từ Firebase
        const response = await axios.post("http://localhost:3001/api/song/check", { audioFileUrl });
          
        setCopyrightInfo(response.data);
        console.log(response.data);
        setShowModal(true);
        
        } catch (error) {
        console.error("Error checking copyright:", error);
        setCopyrightInfo({ message: 'Error checking copyright' });
        setShowModal(true);  
        }
    };
  
    
    
    return (
        <div className="message-bar active" style={{ width: "90%", margin: "5px auto", padding: "10px 20px" }}>
            <img src={song.coverImage} alt={song.title} style={{ width: "40px", height: "40px", marginRight: "20px" }} />
            <span className="nameSong"  style={{ width: "120px"}}>{song.title}</span>
            <span className="artist" style={{ width: "150px"}}> - {song.artist}</span>
            <div  onClick={handleSongClick}>
                    {isPlaying ? <PauseIcon className="pause_play"/> : <FontAwesomeIcon icon={faPlay} className="pause_play"/>} 
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
                style={{ width: "400px", height: "10px", margin: "0 40px" }}
            />
            <div className="actions"> 
                {/* Phần tử audio để phát nhạc */}
                <audio
                    ref={audioRef}
                    src={song.audioFile} // Đường dẫn đến file âm thanh
                    onTimeUpdate={updateTime}
                    onLoadedMetadata={onLoadedMetadata}
                    onEnded={() => {
                        setCurrentTime(0);  // Đặt thời gian về 0 khi kết thúc
                        setIsPlaying(false); // Tạm dừng khi bài hát kết thúc
                    }}
                    controls hidden
                />
                <Link to="#" onClick={checkCopyright} className="check">Kiểm tra bản quyền</Link>
            </div>
           
          
        </div>
    );
};

export default SongItem;
