import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { setSong } from '../../Redux/sliders/songSlide'; 
import { Link } from "react-router-dom";
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Import useMutation và useQueryClient

const SongItem = ({ song }) => {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient(); // Sử dụng để refetch dữ liệu
   
    // Hàm xử lý khi nhấn nút phát bài hát
    
    const handleSongClick = (song) => {
        const originalSong = song.song || song; // Use the nested song if it exists, otherwise use the passed song
        console.log('songInFuncion', originalSong); // Logs the correct song object
        localStorage.setItem('currentSong', JSON.stringify(originalSong));
        localStorage.setItem('isPlaying', true);
        dispatch(setSong(originalSong)); // Dispatch action to update the playing song
        navigate(`/song_play/${originalSong._id}`);
    };

    // Sử dụng useMutation để xóa bài hát
    const deleteSongMutation = useMutation({
        mutationFn: async (originalSong) => { // songToDelete sẽ được truyền vào khi gọi mutate
            return await axios.delete(`http://localhost:3001/api/song/delete/${originalSong._id}`);
        },
        onSuccess: () => {
            console.log('Xóa bài hát thành công');
            alert('Xóa bài hát thành công!');
            // Refetch lại danh sách bài hát sau khi xóa
            queryClient.invalidateQueries('songs');
        },
        onError: (error) => {
            console.error('Lỗi khi xóa bài hát:', error);
            alert('Lỗi khi xóa bài hát');
        }
    });

    
    const handleDelete = (songToDelete) => {
        console.log('Song inside function:', songToDelete); 
        const originalSong = songToDelete.song || songToDelete;
        deleteSongMutation.mutate(originalSong); // Thực hiện xóa bài hát
    };

    return (
        <div className="message-bar active">
            <div className="signal-icon" />
            <span className="nameSong">{song.title}</span>
            <span className="artist">-{song.artist}</span>
            <div className="actions">
              <button className="pause" onClick={() => handleSongClick(song)}>
                <FontAwesomeIcon icon={faPlay}/>
              </button>
              <Link to='/updateSong' state={song={song}}>
                <button className="edit">Sửa</button>
              </Link>  
              <button className="delete" onClick={() => handleDelete(song)}>Xóa</button>
            </div>
        </div>
    );
};

export default SongItem;
