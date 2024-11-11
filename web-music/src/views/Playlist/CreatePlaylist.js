import React,{useState} from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const CreatePlaylist = ({user}) => {

  
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/topic/get`); 
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const [imageLink, setImageLink] = useState('');
    const query = useQuery({ queryKey: ['topics'], queryFn: fetchApi });
    const arrTopic = query.data || [];
    const arrTopicName = arrTopic.map(topic => topic.value);

    const inittialPlaylist ={
        name: "",
        topic: arrTopicName[0],
        description: "",
        coverImage: "",
        creator:user.id,
        plays: 0
    }
    
    const [playlist,setPlaylist] = useState(
        inittialPlaylist
    )
    console.log('creator',playlist.creator);

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
                setPlaylist((prev) => ({
                     ...prev,
                     coverImage: imageUrl // Cập nhật đường dẫn hình ảnh vào sản phẩm
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handelChage =(e)=>{
        const { name, value } = e.target;
        setPlaylist((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handelSubmit =async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/playlist/create', playlist);
            console.log(response.data);
            if(response.data.status === "OK"){
                console.log('Product added successfully:', response.data);
                alert('Product added successfully!');
                setPlaylist(inittialPlaylist); // Reset form after submission
                setImageLink(''); // Reset image link
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
            console.error("There was an error adding the product!", error);
        }
    }
  return (
    
    <div className="" >
             <div className="upload-container">
                 <form className="upload-form" onSubmit={handelSubmit}>
                    <div className="border-top">
                      <h3>TẠO PLAYLIST CỦA BẠN</h3>
                    </div>
                    <div className="upload-box">
                        <div className="upload-info">
                            <div> 
                                <p>Tên Playlist:</p>
                                 <input className="upload-title upload_item"
                                 id='input'
                                    type="text"
                                    name="name"   
                                    onChange={handelChage}
                                    required
                                   >
                                </input>
                            </div>
                            <div> 
                                <p>Mô tả:</p>
                                <input className="upload-artist upload_item"
                                   id='input' 
                                      type="text"
                                      name="description"  
                                      onChange={handelChage}
                                      required
                                  ></input>
                                    
                            </div>
                           
                            <div style={{margin:"10px 0"}}>
                                <p>Chủ đề:</p>
                                <select
                                    name="topic"
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
                        <button className="upload-normal" type="submit" >Tạo Playlist</button>

                   </div>
                    
                 </form>
            </div> 
    </div>
    
  );
};

export default CreatePlaylist;
