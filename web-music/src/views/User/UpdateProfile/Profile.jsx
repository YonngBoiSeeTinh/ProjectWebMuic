import React, { useState,useEffect } from "react";
import { updateUser as updateUserAction } from "../../../Redux/sliders/userSlide"; 
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Profile () {  
    const user = useSelector((state) => state.user);
    const [userUpdate, setUserUpdate] = useState(user);
    useEffect(() => {
        setUserUpdate(user);
        setImageLink(user.avatar || "");
    }, [user]);
    const [imageLink, setImageLink] = useState(user.avatar || "");
    const sexList = ["Nam", "Nữ", "Khác"];
   
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
                setUserUpdate((prev) => ({
                     ...prev,
                     avatar: imageUrl // Cập nhật đường dẫn hình ảnh vào userUpdate
                }));
            };
            reader.readAsDataURL(file);
        }       
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserUpdate((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Đặt giới tính mặc định nếu không có
        if (!userUpdate.sex) {
            userUpdate.sex = sexList[0];
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, userUpdate);
            console.log(response.data);
            if (response.data.status === "OK") {
                console.log('User updated successfully:', response.data);
                dispatch(updateUserAction(userUpdate)); // Cập nhật trạng thái người dùng trong Redux
                alert('Cập nhật người dùng thành công!');        
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message || error.message}`);
            } else if (error.request) {
                alert("Error: Không nhận được phản hồi từ server.");
            } else {
                alert(`Error: ${error.message}`);
            }
            console.error("There was an error updating the user!", error);
        }
    };

    return (
       <div className="profile">
           <h2>Quản lý tài khoản</h2>
           <div style={{ display: "flex" }}> 
                <form className="profile_form" onSubmit={handleSubmit}>
                    <div>
                        <p>Tên</p>
                        <input
                            name="name"
                            onChange={handleChange}
                            value={userUpdate.name || ""}
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <p>Ngày sinh</p>
                        <input
                            name="birthday"
                            onChange={handleChange}
                            value={userUpdate.birthday || ""}
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <p>Giới tính</p>
                        <select
                            name="sex"
                            className="selectType"
                            value={userUpdate.sex || sexList[0]}
                            onChange={handleChange}
                            required
                        >
                            {sexList.map((sex, index) => (
                                <option key={index} value={sex}>
                                    {sex}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>Số điện thoại</p>
                        <input
                            name="phone"
                            onChange={handleChange}
                            value={userUpdate.phone || ""}
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <p>Địa chỉ</p>
                        <input
                            name="address"
                            onChange={handleChange}
                            value={userUpdate.address || ""}
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <p>Email</p>
                        <input
                            name="email"
                            onChange={handleChange}
                            value={userUpdate.email || ""}
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <p>Giới thiệu</p>
                        <input
                            name="introduce"
                            onChange={handleChange}
                            value={userUpdate.introduce || ""}
                            type="text"
                            required
                        />
                    </div>
                    <button type="submit">Lưu</button>
                </form>
                <div className="avatar_box"> 
                    <p>Avatar</p>
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div onClick={() => document.getElementById('fileInput').click()}>
                        <img src={imageLink || "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"} alt="avatar" className="upload-image" />
                    </div>
                </div>
           </div>
       </div>
    );
}

export default Profile;
