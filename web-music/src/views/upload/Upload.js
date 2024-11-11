import React,{useState} from "react";
import './Upload.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const Upload =({user})=> {  

    const [imageLink, setImageLink] = useState("");
    const [audioFile, setAudioFile] = useState("");
    
    const countryList =["Việt Nam","Châu Âu","Hàn Quốc","Âu Mỹ","Châu Á","Trung Quốc","Nhật Bản"]
    const typeList =["Rap","Lofi","Ballad","Pop","Bolero","Beat"]
    const inittialSong ={
        title: "",
        artist: "",
        country: countryList[0],
        coverImage:"",
        type:typeList[0],
        audioFile: "",
        plays:0,
        creator:user?.id,
        isVip:user.isVip,
        isAccept:false,
    }
    
    const [song,setSong] = useState(
        inittialSong
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
    const [isVip, setIsVip] = useState(false)
    const handelClickVip = (vip) => {
        setIsVip(vip);
    };
    const handelSubmit =async(e)=>{
        e.preventDefault();
        const formData = new FormData(); // Khởi tạo đối tượng FormData

        //Thêm các trường vào FormData
        formData.append('title', song.title);
        formData.append('artist', song.artist);
        formData.append('country', song.country);
        formData.append('coverImage', song.coverImage); 
        formData.append('type', song.type);
        formData.append('creator', song.creator);
        formData.append('isVip', isVip);
        formData.append('isAccept', song.isAccept);
        formData.append('audioFile', audioFile); // Thêm tệp âm thanh
        console.log('song', song);
        try {
            const response = await axios.post('http://localhost:3001/api/song/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đặt tiêu đề Content-Type
                },
            });
           
            console.log(response.data);
            if (response.data.status === "OK") {
                console.log('Song added successfully:', response.data);
                alert('Thêm bài hát thành công, vui lòng đợi duyệt!');
                setSong(inittialSong); // Reset form after submission
                setImageLink(''); // Reset image link
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message || error.message}`);
            } else if (error.request) {
                alert("Error: Không nhận được phản hồi từ server.");
            } else {
                alert(`Error: ${error.message}`);
            }
            console.error("There was an error adding the song!", error);
        }
    }
    console.log(user);
        return (
            <>
            {user.id? (
                <div className="upload-container">
                    <form className="upload-form" onSubmit={handelSubmit} >
                        <div className="border-top">
                            <h3>UPLOAD NHẠC CỦA BẠN</h3>
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
                                    />
                                </div>
                                <div>
                                    <p>Ca sĩ, diễn viên trình diễn:</p>
                                    <input
                                        className="upload-artist upload_item"
                                        type="text"
                                        name="artist"    
                                        onChange={handleChange}
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
                                            required
                                        />
                                        <input
                                           
                                            className="upload-audio upload_item"
                                            value={audioFile ? audioFile.name : ''} 
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
                                <img  src={imageLink || "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"}
                                 alt="Song" className="upload-image" />
                            </div>
                            
                        </div>
                        <div className="upload-action">
                            <button type="submit" className="upload-normal" style={{display:!user.isVip?"blox":"none"}}>Tải thường, duyệt trong 72h</button>
                            <button type="submit" className="upload-fast" style={{display:user.isVip?"blox":"none"}}>Tải nhanh, duyệt trong 12h</button>
                        </div>
                    </form>
                </div>
            ) : (
                <h1 className="notify">Vui lòng đăng nhập để sử dụng dịch vụ</h1>
            )}
        </>
            
        );
    
}

export default Upload;
