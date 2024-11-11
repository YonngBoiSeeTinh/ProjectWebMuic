import React,{useState} from "react";
import './Upload.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";

const Upload =({user})=> {  
    const location = useLocation();
    const songUpdate = location.state?.song;
    const [imageLink, setImageLink] = useState(songUpdate.coverImage);
    const [audioFile, setAudioFile] = useState("");

    const countryList =["Việt Nam","Châu Âu","Hàn Quốc","Âu Mỹ","Châu Á","Trung Quốc","Nhật Bản"]
    
    const typeList =["Rap","Lofi","Ballad","Pop","Bolero","Beat"]
    const [song,setSong] = useState(
        songUpdate
    )

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
                setSong((prev) => ({
                     ...prev,
                     coverImage: imageUrl // Cập nhật đường dẫn hình ảnh vào sản phẩm
                }));
            };
            reader.readAsDataURL(file);
        }       
    };
    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
           setAudioFile(file);          
        }       
    };

    const handleChange =(e)=>{
        const { name, value } = e.target;
        setSong((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handelSubmit =async(e)=>{
        e.preventDefault();
        const formData = new FormData(); // Khởi tạo đối tượng FormData
        if(!song.country){
            song.country=countryList[0]
        }
        if(audioFile) {
            const formData = new FormData();
            formData.append('title', song.title);
            formData.append('artist', song.artist);
            formData.append('country', song.country);
            formData.append('coverImage', song.coverImage); 
            formData.append('type', song.type);
            formData.append('isVip', song.isVip);
            formData.append('isAccept', song.isAccept);
            formData.append('audioFile', audioFile); // Thêm tệp âm thanh vào formData
        
            try {
                const response = await axios.put(`http://localhost:3001/api/song/updateHasFile/${songUpdate._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Đặt tiêu đề Content-Type
                    },
                });
        
                console.log(response.data);
                if (response.data.status === "OK") {
                    console.log('Song updated successfully:', response.data);
                    alert('Cập nhật bài hát thành công!');
                }
            } catch (error) {
                console.error("There was an error updating the song!", error);
                console.log(error.response); // Kiểm tra chi tiết phản hồi lỗi
            }
        }
        
        else{
            try {
                if(!song.country){
                    song.country=countryList[0]
                }

                const response = await axios.put(`http://localhost:3001/api/song/update/${songUpdate._id}`,song); 
                if(response.data.status === "OK"){
                    console.log('Cập nhật playlist thành công:', response.data);
                    alert('Cập nhật bài hát  thành công!');
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
       
    }
        return (
            <>
            {user ? (
                <div className="upload-container">
                    <form className="upload-form" onSubmit={handelSubmit} >
                        <div className="border-top">
                            <h3>UPDATE NHẠC CỦA BẠN</h3>
                        </div>
                        <div className="upload-box">
                            <div className="upload-info">
                                <div>
                                    <p>Tên bài hát:</p>
                                    <input
                                        className="upload-title upload_item"
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        required
                                        defaultValue={song.title}
                                    />
                                </div>
                                <div>
                                    <p>Ca sĩ, diễn viên trình diễn:</p>
                                    <input
                                        className="upload-artist upload_item"
                                        type="text"
                                        name="artist"    
                                        onChange={handleChange}
                                        defaultValue={song.artist}
                                        required
                                    />
                                </div>
                                <div>
                                    <p>File nhạc:</p>
                                    <div>
                                        <input
                                            id="audioInput"
                                            style={{ display: "none" }} // Ẩn input
                                            type="file"
                                            accept="audio/*"
                                            name="audio"
                                            onChange={handleAudioChange}
                                        />
                                        <input
                                            className="upload-audio upload_item"
                                            value={audioFile ? audioFile.name :songUpdate.audioFile?songUpdate.audioFile: ''} 
                                            readOnly
                                        />
                                        <button 
                                            type="button" 
                                            className="btn-up_file" 
                                            onClick={() => document.getElementById('audioInput').click()}
                                        >
                                            Up file
                                        </button>
                                       
                                    </div>
                                </div>
                                <div>
                                    <p>Quốc Gia:</p>
                                    <select
                                        name="country"
                                        className="selectType"
                                        onChange={handleChange}
                                        defaultValue={song?.country}
                                        required
                                    >
                                        {countryList.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p>Thể loại:</p>
                                    <select
                                        name="type"
                                        className="selectType"
                                        onChange={handleChange}
                                        required
                                        defaultValue={song.type}
                                    >
                                        {typeList.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                               
                            </div>
                            <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                            <div  onClick={() => document.getElementById('fileInput').click()}>
                                <img  src={ imageLink || "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"}
                                 alt="Song" className="upload-image" />
                            </div>
                            
                        </div>
                        <div className="song-lyrics" style={{width:"98%"}}>
                            <div className="song-lyrics_infor">
                                <h3 className="">Lời bài hát</h3> 
                                <div className="lyrics">
                                    <input name="lyrics" type="text" className="lyrics-input"></input>
                                </div>
                            </div>
                        </div>
                        <div className="upload-action">
                            <button type="submit" className="upload-fast">Cập nhật bài hát</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>Vui lòng đăng nhập để sử dụng dịch vụ</div>
            )}
        </>
            
        );
    
}

export default Upload;
