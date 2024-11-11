import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SongItem from './PlaylistSongItemUpdate';
import AddSongItem from './AddSongItem'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdatePlaylist = ({user}) => {
    const location = useLocation();
    const { playlist } = location.state || {};
    
    const navigate = useNavigate()
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/topic/get`); 
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    
    const [imageLink, setImageLink] = useState(playlist.coverImage);
    const query = useQuery({ queryKey: ['topics'], queryFn: fetchApi });
    const arrTopic = query.data || [];
    const arrTopicName = arrTopic.map(topic => topic.value);

    const [playlistUpdate,setPlaylistUpdate] = useState(
        playlist
    )
    const [arrSongPlaylist, setArrSongPlaylist] = useState( playlist?.songs ||[])

    useEffect(() => {
        setPlaylistUpdate((prev) => ({
            ...prev,
            songs: arrSongPlaylist
        }));
       
    }, [arrSongPlaylist]);
    
    
    const handleDeleteSong = (songid) => {
        console.log(songid);
        setArrSongPlaylist((prev) => {
          return prev.filter((song) => song._id !== songid);
        });
       
      };
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
    const querySongData = querySong.data || [];
    const arrSong = querySongData.filter((item)=>item.isAccept)

    if (query.isLoading) {
        return <div>Loading...</div>; 
    }

    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>; 
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
                setPlaylistUpdate((prev) => ({
                     ...prev,
                     coverImage: imageUrl // Cập nhật đường dẫn hình ảnh vào sản phẩm
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handelChage =(e)=>{
        const { name, value } = e.target;
        setPlaylistUpdate((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handelSubmit =async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/playlist/update/${playlist._id}`,playlistUpdate);
          
            if(response.data.status === "OK"){
                console.log('Cập nhật playlist thành công:', response.data);
                alert('Cập nhật playlist thành công!');
            }
           
        } catch (error) {
            if (error.response) {
                // Lỗi do server trả về
                alert(`Error: ${error.response.data.message || error.message}`);
            } else if (error.request) {
                alert("Error: Không nhận được phản hồi từ server.");
            } else {
                // Lỗi khác
                alert(`Error: ${error.message}`);
            }
            console.error("There was an error update the playlist!", error);
        }
    }
    const handelDelete =async()=>{
        try {
            const response = await axios.delete(`http://localhost:3001/api/playlist/delete/${playlist._id}`);
            console.log(response.data);
            if(response.data.status === "OK"){
                console.log('Xóa playlist thành công:', response.data);
                alert('Xóa playlist thành công!');
                navigate('/userPage')
            }
           
        } catch (error) {
            if (error.response) {
                // Lỗi do server trả về
                alert(`Error: ${error.response.data.message || error.message}`);
            } else if (error.request) {
                alert("Error: Không nhận được phản hồi từ server.");
            } else {
                // Lỗi khác
                alert(`Error: ${error.message}`);
            }
            console.error("There was an error delete the playlist!", error);
        }
    }
  return (
    
    <div className="" >
             <div className="upload-container">
                 <form className="upload-form" onSubmit={handelSubmit}>
                    <div className="border-top">
                      <h2 className='upload_tit'>CẬP NHẬT PLAYLIST CỦA BẠN</h2>
                    </div>
                    <div className="upload-box">
                        <div className="upload-info">
                            <div> 
                                <p>Tên Playlist:</p>
                                 <input className="upload-title upload_item"
                                    type="text"
                                    name="name"  
                                    defaultValue={playlist.name}
                                    onChange={handelChage}
                                    required
                                   >
                                </input>
                            </div>
                            <div> 
                                <p>Mô tả:</p>
                                <input className="upload-artist upload_item" 
                                      type="text"
                                      name="description"  
                                      defaultValue={playlist.description}
                                      onChange={handelChage}
                                      required
                                  ></input>
                                    
                            </div>
                           
                            <div style={{margin:"10px 0"}}>
                                <p>Chủ đề:</p>
                                <select
                                    name="topic"
                                    defaultValue={playlist.topic}
                                    onChange={handelChage}
                                    className="selectType"
                                >
                                    {arrTopicName.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>         
                           
                        </div>
                        <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                        <div className="product-gallery" onClick={() => document.getElementById('fileInput').click()}>
                            <img  src={imageLink || "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"} alt="Playlist" className="upload-image" />
                        </div>
                       
                    </div>
                   <div className="upload-action">
                        <button className="delete_playlist" onClick={handelDelete} >Xóa Playlist</button>
                        <button className="upload-normal" type="submit" >Cập nhật Playlist</button>
                   </div>
                    
                 </form>
            </div> 
            <div className='song_in-playlist'>
                <div className='upload_song-tit'>
                    <h2 className='upload_tit'>Danh sách bài hát: </h2>
                    
                </div>
              
                <div style={{width:"80%", margin:"10px auto"}}>
                    <div style={{display:"flex"}}>
                        <div className='song_list_to-add'> 
                            <input
                                name='search'
                                placeholder={"Tìm kiếm"}
                            ></input>
                            {arrSong.map((song, index) => (
                                <AddSongItem song={song} key={index} arrSongPlaylist={arrSongPlaylist} setArrSongPlaylist ={setArrSongPlaylist}/>
                            ))}
                        </div>
                        <div className='song_list_added'>
                            {playlistUpdate.songs.map((songid, index) => (
                                <SongItem songid={songid} key={index} handleDeleteSong ={handleDeleteSong}/>
                            ))}
                        </div>
                    </div>
                   
                </div>
                    
            </div>
    </div>
    
  );
};

export default UpdatePlaylist;
