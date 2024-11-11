import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";
import UploadSongItem from '../Upload/UploadSongItem'
import './userPage.css'
function UserPage({ setAlertMessage,setShowAlert, setType }) {
    const location = useLocation()
    const user = location.state?.user;
    console.log('employee', user);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [avatar, setAvatar] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);

    const handleEditPhone = () => setIsEditingPhone(true);
    const handleEditAddress = () => setIsEditingAddress(true);
    const handleEditName = () => setIsEditingName(true);
    const handleEditEmail = () => setIsEditingEmail(true);

    const handleSavePhone = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { phone });
           
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật số điện thoại thành công ");
                setType("success");
                setShowAlert(true);
            } else {
                console.log(response.data); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingPhone(false);
    };
    const handleSaveAddress = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { address });
            console.log(user._id);
            console.log(response);
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật  địa chỉ thành công");
                setType("success");
                setShowAlert(true);
            } else {
               
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingAddress(false);
    };

    const handleSaveName = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { name });
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật tên thành công");
                setType("success");
                setShowAlert(true);
            } else {
                alert(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingName(false);
    };

    const handleSaveEmail = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { email });
            if (response.data.status === 'OK') {
                setAlertMessage("Cập email  thành công");
                setType("success");
                setShowAlert(true);
            } else {
                alert(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
        setAlertMessage(error.response.data.message);
            setType("danger");
            setShowAlert(true);
        }
        setIsEditingEmail(false);
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setAvatar(imageUrl); // Cập nhật avatar xong mới gọi handleSaveAvatar
            };
            reader.readAsDataURL(file);
        }
    };
    // Sử dụng useEffect để gọi handleSaveAvatar khi avatar thay đổi
    useEffect(() => {
        if (avatar) {
            handleSaveAvatar();
        }
    }, [avatar]);
    const handleSaveAvatar = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { avatar });
            console.log('avatar', avatar);
           
            if (response.data.status === 'OK') {
                console.log(response); // Cập nhật Redux
                setAlertMessage("Cập nhật avatar thành công");
                setType("success");
                setShowAlert(true);
            } else {
                
            }
        } catch (error) {
            alert(error.response.data.statusText);
            console.error('Error updating avatar:', error);
        }
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
    const queryDataSong= querySong.data || [];
    const arrSong = queryDataSong.filter((item)=> item?.creator === user?._id && item.isAccept)
    console.log(arrSong); 

    return (
        <div style={{height:"100vh", marginTop:"130px " }}>
            <div className="user-page">
                <div className="user-profile">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="avatar-section" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={user?.avatar ? user.avatar : (avatar?avatar:"https://cdn-icons-png.flaticon.com/512/4211/4211763.png")} alt="avatar" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{ display: 'flex' }}>
                            {isEditingName ? (
                                <>
                                    <input className="table_row-infor" value={name} onChange={(e) => setName(e.target.value)} />
                                    <button  className="submit_upt_suer" onClick={handleSaveName}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <h1 className="user-name">{name || ""}</h1>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditName} />
                                </>
                            )}
                        </div>
                        <div style={{ display: 'flex' }}>
                            {isEditingEmail ? (
                                <>
                                    <input className="table_row-infor" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button  className="submit_upt_suer" onClick={handleSaveEmail}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <p className="user-email">{email || ""}</p>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditEmail} />
                                </>
                            )}
                        </div>
                        <div className="user-action">
                            <button className="edit-profile-btn">Đổi mật khẩu</button>
                        </div>
                    </div>
                </div>

                <div className="account-details">
                    <h2>Thông tin tài khoản</h2>
                    <div className="account-table">
                       
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                            {isEditingPhone ? (
                                <>
                                    <input className="table_row-infor" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <button className="submit_upt_suer" onClick={handleSavePhone}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <div className="table_row-infor">{phone || ""}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditPhone} />
                                </>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            {isEditingAddress ? (
                                <>
                                    <input className="table_row-infor" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <button  className="submit_upt_suer" onClick={handleSaveAddress}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <div className="table_row-infor">{address || ""}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditAddress} />
                                </>
                            )}
                        </div> 
                    </div>
                </div>
                <div className="song_list">
                    <h2>Danh sách bài hát</h2>
                    {arrSong.map((song, index) => (
                        <UploadSongItem song={song} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserPage;
